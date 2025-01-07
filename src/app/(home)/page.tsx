"use client";

import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/features/search/SearchBar/SearchBar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ArrowRight as ArrowSideways,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CuratedContent } from "@/components/features/home/CuratedContent/CuratedContent";
import { mockTrendingTopics, mockTrendingContent } from "@/data/mock/mock-trending";

const popularSearches = [
  "Large Language Models",
  "Transformers",
  "Computer Vision",
  "Reinforcement Learning",
  "Neural Networks",
];

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // Get top 5 trending topics and content
  const topTrendingTopics = mockTrendingTopics.slice(0, 5);
  const trendingContent = mockTrendingContent.slice(0, 5);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 bg-background">
        <div className="container max-w-4xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover AI/ML Content
          </h1>
          <p className="text-xl text-muted-foreground">
            Find and explore cutting-edge research papers, repositories,
            articles, and discussions in artificial intelligence and machine
            learning.
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

      {/* Main Content Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
            {/* Left Column - Curated Content */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Curated Content</h2>
              <CuratedContent />
            </div>

            {/* Right Column - Trending */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Trending</h2>
              {/* Trending Topics */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">Trending Topics</h2>
                    </div>
                    <Link
                      href="/trending"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      View all <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {topTrendingTopics.map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/search?topic=${encodeURIComponent(
                          topic.title
                        )}`}
                      >
                        <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded-md px-2 cursor-pointer">
                          <span className="text-sm">{topic.title}</span>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="secondary"
                              className="rounded-full px-2"
                            >
                              {topic.trendMetrics.score}
                            </Badge>
                            <div className="text-muted-foreground">
                              {topic.trendMetrics.change > 10 ? (
                                <ArrowUp className="w-4 h-4 text-green-500" />
                              ) : topic.trendMetrics.change < -10 ? (
                                <ArrowDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <ArrowSideways className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Content */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">
                        Trending Content
                      </h2>
                    </div>
                    <Link
                      href="/trending"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      View all <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {trendingContent.map((content) => (
                      <Link key={content.id} href={`/content/${content.id}`}>
                        <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded-md px-2 cursor-pointer">
                          <div>
                            <span className="text-sm">{content.title}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {content.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="secondary"
                              className="rounded-full px-2"
                            >
                              {content.trendMetrics.score}
                            </Badge>
                            <div className="text-muted-foreground">
                              {content.trendMetrics.change > 10 ? (
                                <ArrowUp className="w-4 h-4 text-green-500" />
                              ) : content.trendMetrics.change < -10 ? (
                                <ArrowDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <ArrowSideways className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
