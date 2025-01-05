import { Suspense } from "react";
import { HeroSection } from "@/components/features/home/HeroSection/HeroSection";
import { CuratedContentSection } from "@/components/features/home/CuratedContentSection/CuratedContentSection";
import { HomeTrendingSection } from "@/components/features/home/HomeTrendingSection/HomeTrendingSection";
import { HomeErrorBoundary } from "@/components/features/home/HomeErrorBoundary";

export const metadata = {
  title: "AIScout - Discover AI/ML Content",
  description:
    "Find and explore cutting-edge research papers, repositories, articles, and discussions in artificial intelligence and machine learning.",
  openGraph: {
    title: "AIScout - Discover AI/ML Content",
    description:
      "Find and explore cutting-edge research papers, repositories, articles, and discussions in artificial intelligence and machine learning.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <HomeErrorBoundary>
      <main className="min-h-screen">
        <HeroSection />

        <div className="container py-16 space-y-16">
          <Suspense fallback={<CuratedContentSkeleton />}>
            <CuratedContentSection />
          </Suspense>

          <Suspense fallback={<TrendingSkeleton />}>
            <HomeTrendingSection />
          </Suspense>
        </div>
      </main>
    </HomeErrorBoundary>
  );
}

function CuratedContentSkeleton() {
  return (
    <div className="space-y-8" data-testid="curated-content-skeleton">
      <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div
      className="h-96 bg-muted rounded-lg animate-pulse"
      data-testid="trending-skeleton"
    />
  );
}
