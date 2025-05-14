import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Loudable</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Turn customer calls into proof
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Loudable helps you transform customer conversations into powerful marketing assets.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Try the App
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 p-6 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Star className="mx-auto h-16 w-16 text-blue-600" />
                      <p className="mt-4 text-xl font-medium">Transform customer feedback into marketing gold</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32" id="features">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to turn customer conversations into compelling marketing assets.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Auto G2 Review Generator</h3>
                <p className="text-center text-gray-500">
                  Transform customer quotes into structured G2-style reviews in seconds.
                </p>
                <Link href="/dashboard/g2-review-generator" className="inline-flex items-center text-blue-600">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Case Study Builder</h3>
                <p className="text-center text-gray-500">
                  Turn interview transcripts into compelling case studies with a few clicks.
                </p>
                <Link href="/dashboard/case-study-builder" className="inline-flex items-center text-blue-600">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Testimonial Sorter</h3>
                <p className="text-center text-gray-500">
                  Organize and filter customer testimonials by industry, persona, and keywords.
                </p>
                <Link href="/dashboard/testimonial-sorter" className="inline-flex items-center text-blue-600">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Trusted By</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join hundreds of companies using Loudable to amplify their customer success stories.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 py-6 grayscale">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex h-12 w-32 items-center justify-center rounded-lg bg-gray-100">
                    <span className="text-sm font-medium text-gray-500">LOGO {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-blue-600 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to amplify your customer success stories?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl/relaxed">
                Join hundreds of companies using Loudable to turn customer conversations into powerful marketing assets.
              </p>
            </div>
            <div className="mx-auto flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="w-full min-[400px]:w-auto bg-white text-blue-600 hover:bg-gray-100">
                  Try the App
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto border-white text-white hover:bg-white/10"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto flex flex-col gap-6 py-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-bold">Loudable</span>
            </div>
            <p className="text-sm text-gray-500">
              Turn customer calls into proof. © {new Date().getFullYear()} Loudable Inc.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link href="#" className="text-sm hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
