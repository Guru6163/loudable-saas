import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your `.env.local`
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { customerQuote, reviewerRole, rating } = body

        if (!customerQuote || !reviewerRole || !rating) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
        }

        const prompt = `
You are a B2B SaaS user writing a detailed G2 review. Based on the following info, write a G2 review with the following sections:

1. What do you like best?
2. What do you dislike?
3. Recommendations to others
4. What problems were you solving? What benefits did you get?

Input:
Customer Quote: "${customerQuote}"
Reviewer Role: ${reviewerRole}
Rating: ${rating}/5
`

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        })

        const generatedText = completion.choices[0]?.message?.content

        return NextResponse.json({ review: generatedText })
    } catch (error) {
        console.error("Error generating review:", error)
        return NextResponse.json({ error: "Failed to generate review." }, { status: 500 })
    }
}
