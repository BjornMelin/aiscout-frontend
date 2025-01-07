import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About AIScout</h1>
          <p className="text-xl text-muted-foreground">
            Your AI research companion for discovering and exploring
            cutting-edge content
          </p>
        </section>

        {/* Mission Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            AIScout aims to make artificial intelligence and machine learning
            research more accessible and discoverable. We provide a platform
            where researchers, developers, and enthusiasts can find, share, and
            discuss the latest advancements in AI/ML.
          </p>
        </section>

        {/* Features Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Research Papers</h3>
              <p className="text-muted-foreground">
                Access and discover the latest research papers in AI and machine
                learning
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Code Repositories</h3>
              <p className="text-muted-foreground">
                Find and explore implementations of cutting-edge AI algorithms
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Articles & Discussions</h3>
              <p className="text-muted-foreground">
                Engage with the community through articles and discussions
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track trends and measure impact in the AI research community
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <p className="text-muted-foreground leading-relaxed">
            We are a passionate team of researchers, developers, and designers
            working to make AI research more accessible and collaborative. Our
            diverse backgrounds in machine learning, software engineering, and
            user experience design help us create the best possible platform for
            the AI community.
          </p>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-8">
          <h2 className="text-2xl font-semibold">Join Our Community</h2>
          <p className="text-muted-foreground">
            Be part of the growing AI research community. Share your work,
            discover new research, and collaborate with others.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
