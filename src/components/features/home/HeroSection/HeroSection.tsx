"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/features/search/SearchBar/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const popularSearches = [
  "Large Language Models",
  "Transformers",
  "Computer Vision",
  "Reinforcement Learning",
  "Neural Networks",
];

interface HeroSectionProps {
  isLoading?: boolean;
}

export function HeroSection({ isLoading = false }: HeroSectionProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  if (isLoading) {
    return (
      <section
        className="relative py-20 bg-background"
        data-testid="hero-section-skeleton"
      >
        <div className="container max-w-4xl text-center space-y-8">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Skeleton className="h-4 w-16" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative py-20 bg-background"
      data-testid="hero-section"
    >
      <div className="container max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Discover AI/ML Content
        </h1>
        <p className="text-xl text-muted-foreground">
          Find and explore cutting-edge research papers, repositories, articles,
          and discussions in artificial intelligence and machine learning.
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar
            variant="page"
            onSearch={handleSearch}
            className="mb-4"
            placeholder="Search AI research and projects..."
          />
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularSearches.map((term) => (
              <Badge
                key={term}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => handleSearch(term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
