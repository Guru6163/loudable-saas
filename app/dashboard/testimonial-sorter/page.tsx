"use client"

import { useState } from "react"
import { Download, Filter, Search, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Sample testimonial data
const sampleTestimonials = [
  {
    id: 1,
    quote:
      "This product has completely transformed how our team collaborates. We've seen a 30% increase in productivity since implementation.",
    author: "Sarah Johnson",
    role: "CTO",
    company: "TechSolutions Inc.",
    industry: "Technology",
    persona: "Technical Leader",
    keywords: ["productivity", "collaboration", "implementation"],
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The customer support team is exceptional. They helped us solve a critical issue within hours, preventing any downtime.",
    author: "Michael Chen",
    role: "Head of Operations",
    company: "GlobalHealth",
    industry: "Healthcare",
    persona: "Operations",
    keywords: ["support", "customer service", "reliability"],
    rating: 5,
  },
  {
    id: 3,
    quote: "We've been able to reduce our reporting time by 50% thanks to the automated dashboard features.",
    author: "Emily Rodriguez",
    role: "CFO",
    company: "Finance Plus",
    industry: "Finance",
    persona: "Executive",
    keywords: ["reporting", "automation", "dashboard"],
    rating: 4,
  },
  {
    id: 4,
    quote: "The onboarding process was smooth, but we did encounter some challenges with the API integration.",
    author: "David Kim",
    role: "IT Director",
    company: "EduTech",
    industry: "Education",
    persona: "Technical Leader",
    keywords: ["onboarding", "integration", "API"],
    rating: 3,
  },
  {
    id: 5,
    quote: "This solution has helped us meet compliance requirements while improving our customer experience.",
    author: "Jennifer Lee",
    role: "Compliance Officer",
    company: "SecureBank",
    industry: "Finance",
    persona: "Compliance",
    keywords: ["compliance", "security", "customer experience"],
    rating: 4,
  },
  {
    id: 6,
    quote: "The analytics capabilities have given us insights we never had before, driving our strategic decisions.",
    author: "Robert Wilson",
    role: "Marketing Director",
    company: "RetailGiant",
    industry: "Retail",
    persona: "Marketing",
    keywords: ["analytics", "insights", "strategy"],
    rating: 5,
  },
]

export default function TestimonialSorter() {
  const { toast } = useToast()
  const [testimonials, setTestimonials] = useState(sampleTestimonials)
  const [filteredTestimonials, setFilteredTestimonials] = useState(sampleTestimonials)
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("")
  const [personaFilter, setPersonaFilter] = useState("")
  const [selectedTestimonials, setSelectedTestimonials] = useState<number[]>([])

  // Get unique industries and personas for filter dropdowns
  const industries = Array.from(new Set(testimonials.map((t) => t.industry)))
  const personas = Array.from(new Set(testimonials.map((t) => t.persona)))

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, industryFilter, personaFilter)
  }

  const handleIndustryFilter = (industry: string) => {
    setIndustryFilter(industry)
    applyFilters(searchTerm, industry, personaFilter)
  }

  const handlePersonaFilter = (persona: string) => {
    setPersonaFilter(persona)
    applyFilters(searchTerm, industryFilter, persona)
  }

  const applyFilters = (search: string, industry: string, persona: string) => {
    let filtered = [...testimonials]

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.quote.toLowerCase().includes(searchLower) ||
          t.author.toLowerCase().includes(searchLower) ||
          t.company.toLowerCase().includes(searchLower) ||
          t.keywords.some((k) => k.toLowerCase().includes(searchLower)),
      )
    }

    if (industry) {
      filtered = filtered.filter((t) => t.industry === industry)
    }

    if (persona) {
      filtered = filtered.filter((t) => t.persona === persona)
    }

    setFilteredTestimonials(filtered)
  }

  const handleSelectTestimonial = (id: number) => {
    setSelectedTestimonials((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedTestimonials.length === filteredTestimonials.length) {
      setSelectedTestimonials([])
    } else {
      setSelectedTestimonials(filteredTestimonials.map((t) => t.id))
    }
  }

  const handleExport = () => {
    if (selectedTestimonials.length === 0) {
      toast({
        title: "No testimonials selected",
        description: "Please select at least one testimonial to export.",
        variant: "destructive",
      })
      return
    }

    const selectedItems = testimonials.filter((t) => selectedTestimonials.includes(t.id))
    const exportText = selectedItems.map((t) => `"${t.quote}"\n- ${t.author}, ${t.role} at ${t.company}\n\n`).join("")

    // Create a blob and download it
    const blob = new Blob([exportText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "exported-testimonials.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Testimonials exported",
      description: `${selectedTestimonials.length} testimonials have been exported.`,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setIndustryFilter("")
    setPersonaFilter("")
    setFilteredTestimonials(testimonials)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Testimonial Sorter</h1>
        <p className="text-gray-500">Organize and filter customer testimonials by various criteria.</p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Browse, filter, and export customer testimonials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search testimonials..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={industryFilter} onValueChange={handleIndustryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={personaFilter} onValueChange={handlePersonaFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by persona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Personas</SelectItem>
                  {personas.map((persona) => (
                    <SelectItem key={persona} value={persona}>
                      {persona}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={clearFilters} title="Clear filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={
                    selectedTestimonials.length === filteredTestimonials.length && filteredTestimonials.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm font-medium">
                  Select All
                </Label>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport} disabled={selectedTestimonials.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Export Selected
              </Button>
            </div>
            <div className="divide-y">
              {filteredTestimonials.length > 0 ? (
                filteredTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="flex gap-4 p-4">
                    <Checkbox
                      id={`testimonial-${testimonial.id}`}
                      checked={selectedTestimonials.includes(testimonial.id)}
                      onCheckedChange={() => handleSelectTestimonial(testimonial.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">"{testimonial.quote}"</p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <span>
                          {testimonial.role} at {testimonial.company}
                        </span>
                        <span>•</span>
                        <Badge variant="outline">{testimonial.industry}</Badge>
                        <Badge variant="outline">{testimonial.persona}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {testimonial.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-32 items-center justify-center p-4 text-center">
                  <p className="text-sm text-gray-500">No testimonials match your filters.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
