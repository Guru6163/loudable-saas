import { NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    try {
        const { transcript, industry, companySize } = await req.json()

        if (!transcript || !industry || !companySize) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const prompt = `
You're an expert B2B marketer. Write a case study in 3 sections—Problem, Solution, Results—for a ${companySize} company in the ${industry} industry.

Here is the interview transcript to use as context:
"""
${transcript}
"""

Structure:
## Problem
<Explain the customer's core pain points>

## Solution
<Explain how the product or service solved the problems>

## Results
<Include 3-4 clear metrics or outcome statements>
`

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a B2B SaaS marketing expert writing clear and concise case studies.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
        })

        const responseText = completion.choices[0].message.content || ""

        // Optionally, split the response into sections
        const extractSection = (label: string) => {
            const match = responseText.match(new RegExp(`## ${label}\\s+([\\s\\S]*?)(?=\\n##|$)`))
            return match?.[1]?.trim() || ""
        }

        const result = {
            problem: extractSection("Problem"),
            solution: extractSection("Solution"),
            results: extractSection("Results"),
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error("Case Study API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
