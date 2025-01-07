"use client";

import React from "react";
import { HeroSection } from "@/components/features/home/HeroSection/HeroSection";
import { HomeTrendingSection } from "@/components/features/home/HomeTrendingSection/HomeTrendingSection";
import { CuratedContent } from "@/components/features/home/CuratedContent/CuratedContent";
import { useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Add your content fetching logic here
  };

  return (
    <main className="flex-1">
      <HeroSection isLoading={isLoading} />

      {/* Main Content Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
            {/* Left Column - Curated Content */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Popular Content</h2>
              <CuratedContent
                isLoading={isLoading}
                error={error || undefined}
                onRetry={handleRetry}
              />
            </div>

            {/* Right Column - Trending */}
            <HomeTrendingSection isLoading={isLoading} />
          </div>
        </div>
      </section>
    </main>
  );
}
