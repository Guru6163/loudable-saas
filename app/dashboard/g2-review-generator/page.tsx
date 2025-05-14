"use client";

import { useState } from "react";
import { Copy, StarIcon } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

export default function G2ReviewGenerator() {
  const { toast } = useToast();
  const [customerQuote, setCustomerQuote] = useState("");
  const [reviewerRole, setReviewerRole] = useState("");
  const [rating, setRating] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!customerQuote || !reviewerRole || !rating) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to generate a review.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const res = await fetch("/api/g2-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerQuote, reviewerRole, rating }),
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedReview(data.review);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error: any) {
      toast({
        title: "Generation error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReview);
    toast({
      title: "Copied to clipboard",
      description: "The generated review has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          G2 Review Generator
        </h1>
        <p className="text-gray-500">
          Transform customer quotes into structured G2-style reviews.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              Enter a customer quote and select options to generate a G2-style
              review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-quote">Customer Quote</Label>
              <Textarea
                id="customer-quote"
                placeholder="Paste customer quote or feedback here..."
                className="min-h-[120px]"
                value={customerQuote}
                onChange={(e) => setCustomerQuote(e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="reviewer-role">Reviewer Role</Label>
                <Select value={reviewerRole} onValueChange={setReviewerRole}>
                  <SelectTrigger id="reviewer-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CEO">CEO</SelectItem>
                    <SelectItem value="CTO">CTO</SelectItem>
                    <SelectItem value="Head of Marketing">
                      Head of Marketing
                    </SelectItem>
                    <SelectItem value="Product Manager">
                      Product Manager
                    </SelectItem>
                    <SelectItem value="Director of Operations">
                      Director of Operations
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Product Rating</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">
                      <div className="flex items-center">
                        <span>5 - Excellent</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="4">
                      <div className="flex items-center">
                        <span>4 - Very Good</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center">
                        <span>3 - Good</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className="flex items-center">
                        <span>2 - Fair</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="1">
                      <div className="flex items-center">
                        <span>1 - Poor</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={
                isGenerating || !customerQuote || !reviewerRole || !rating
              }
            >
              {isGenerating ? "Generating..." : "Generate Review"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated G2 Review</CardTitle>
            <CardDescription>
              The AI-generated G2-style review based on your input.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedReview ? (
              <>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Number.parseInt(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{rating}/5</span>
                </div>
                <div className="rounded-md bg-gray-50 p-4">
                  <pre className="whitespace-pre-wrap text-sm">
                    {generatedReview}
                  </pre>
                </div>
                <Button className="w-full" onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </>
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed p-4 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Your generated review will appear here.
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
