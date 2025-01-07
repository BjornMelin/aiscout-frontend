"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ArrowRight as ArrowSideways,
} from "lucide-react";
import Link from "next/link";
import {
  mockTrendingTopics,
  mockTrendingContent,
} from "@/data/mock/mock-trending";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeTrendingSectionProps {
  isLoading?: boolean;
}

export function HomeTrendingSection({
  isLoading = false,
}: HomeTrendingSectionProps) {
  // Get top 5 trending topics and content
  const topTrendingTopics = mockTrendingTopics.slice(0, 5);
  const trendingContent = mockTrendingContent.slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="home-trending-section-skeleton">
        <Skeleton className="h-8 w-32" />
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <Skeleton className="h-4 w-48" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="home-trending-section">
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
                href={`/search?topic=${encodeURIComponent(topic.title)}`}
              >
                <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded-md px-2 cursor-pointer">
                  <span className="text-sm">{topic.title}</span>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="rounded-full px-2">
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
              <h2 className="text-lg font-semibold">Trending Content</h2>
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
                    <Badge variant="secondary" className="rounded-full px-2">
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
  );
}
