"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function CaseStudyBuilder() {
  const { toast } = useToast();
  const [transcript, setTranscript] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [caseStudy, setCaseStudy] = useState({
    problem: "",
    solution: "",
    results: "",
  });

  const handleGenerate = async () => {
    if (!transcript || !industry || !companySize) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to generate a case study.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/case-study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript, industry, companySize }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate case study");
      }

      const data = await response.json();

      setCaseStudy({
        problem: data.problem,
        solution: data.solution,
        results: data.results,
      });

      toast({
        title: "Case study generated",
        description: "Your case study has been successfully created.",
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description:
          error.message ||
          "Something went wrong while generating the case study.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = (format: string) => {
    const fullCaseStudy = `# Case Study: ${industry} Company Transformation

## Problem
${caseStudy.problem}

## Solution
${caseStudy.solution}

## Results
${caseStudy.results}
`;

    // Create a blob and download it
    const blob = new Blob([fullCaseStudy], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `case-study-${industry.toLowerCase().replace(/\s+/g, "-")}.${
      format === "markdown" ? "md" : "txt"
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Case study exported",
      description: `Your case study has been exported as a ${
        format === "markdown" ? "Markdown" : "text"
      } file.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Case Study Builder
        </h1>
        <p className="text-gray-500">
          Turn interview transcripts into compelling case studies.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full">
        {" "}
        {/* Updated line */}
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              Enter an interview transcript and select options to generate a
              case study.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transcript">Interview Transcript</Label>
              <Textarea
                id="transcript"
                placeholder="Paste interview transcript here..."
                className="min-h-[200px]"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-size">Company Size</Label>
                <Select value={companySize} onValueChange={setCompanySize}>
                  <SelectTrigger id="company-size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small (1-50 employees)">
                      Small (1-50 employees)
                    </SelectItem>
                    <SelectItem value="Medium (51-500 employees)">
                      Medium (51-500 employees)
                    </SelectItem>
                    <SelectItem value="Large (501-5000 employees)">
                      Large (501-5000 employees)
                    </SelectItem>
                    <SelectItem value="Enterprise (5000+ employees)">
                      Enterprise (5000+ employees)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={
                isGenerating || !transcript || !industry || !companySize
              }
            >
              {isGenerating ? "Generating..." : "Generate Case Study"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Case Study</CardTitle>
            <CardDescription>
              The AI-generated case study based on your input.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {caseStudy.problem ? (
              <>
                <Tabs defaultValue="problem">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="problem">Problem</TabsTrigger>
                    <TabsTrigger value="solution">Solution</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>
                  <TabsContent value="problem" className="mt-4">
                    <div className="rounded-md bg-gray-50 p-4">
                      <p className="whitespace-pre-line text-sm">
                        {caseStudy.problem}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="solution" className="mt-4">
                    <div className="rounded-md bg-gray-50 p-4">
                      <p className="whitespace-pre-line text-sm">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="results" className="mt-4">
                    <div className="rounded-md bg-gray-50 p-4">
                      <p className="whitespace-pre-line text-sm">
                        {caseStudy.results}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleExport("markdown")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export as Markdown
                  </Button>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => handleExport("text")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export as Text
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed p-4 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Your generated case study will appear here.
                  </p>
                  {isGenerating && (
                    <div className="flex justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
