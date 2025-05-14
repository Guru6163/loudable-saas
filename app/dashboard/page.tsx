import Link from "next/link"
import { BarChart, FileText, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome to Loudable. Turn customer calls into proof.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews Generated</CardTitle>
            <Star className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Case Studies Created</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">+1 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>G2 Review Generator</CardTitle>
            <CardDescription>Transform customer quotes into structured G2-style reviews.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/g2-review-generator">
              <Button className="w-full">
                <Star className="mr-2 h-4 w-4" />
                Generate Reviews
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Case Study Builder</CardTitle>
            <CardDescription>Turn interview transcripts into compelling case studies.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/case-study-builder">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Build Case Studies
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
