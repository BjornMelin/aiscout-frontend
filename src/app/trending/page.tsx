"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { getTrendingContent, getTrendingTopics } from "@/lib/utils/content";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingContentCard } from "@/components/features/trending/TrendingContentCard/TrendingContentCard";
import { TrendingInsights } from "@/components/features/trending/TrendingInsights/TrendingInsights";
import { TrendGraph } from "@/components/features/trending/TrendGraph/TrendGraph";
import type {
  TrendingContent,
  TrendingTopic,
  TrendingInsight,
} from "@/lib/types/trending";

export default function TrendingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [trendingContent, setTrendingContent] = useState<TrendingContent[]>([]);
  const [insights, setInsights] = useState<TrendingInsight[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
        setTrendingTopics(getTrendingTopics());
        setTrendingContent(getTrendingContent());
        // TODO: Replace with actual insights API call
        setInsights([
          {
            id: "1",
            topic: "Large Language Models",
            insight:
              "Significant increase in research papers focusing on model compression techniques",
            source: "Research Trends Analysis",
            date: "2024-01-15",
            url: "/trends/llm-compression",
            trendingScore: 95,
          },
          {
            id: "2",
            topic: "Computer Vision",
            insight: "Growing interest in zero-shot learning approaches",
            source: "Community Insights",
            date: "2024-01-14",
            url: "/trends/cv-zero-shot",
            trendingScore: 88,
          },
        ]);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch trending data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Trending</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
        <div className="space-y-8">
          <Tabs defaultValue="topics" className="space-y-8">
            <TabsList>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="topics" className="space-y-6">
              {isLoading ? (
                <LoadingState />
              ) : (
                <div className="grid gap-6">
                  {trendingTopics.map((topic) => (
                    <TrendingContentCard
                      key={topic.id}
                      content={topic}
                      showFullDescription
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              {isLoading ? (
                <LoadingState />
              ) : (
                <div className="grid gap-6">
                  {trendingContent.map((content) => (
                    <TrendingContentCard
                      key={content.id}
                      content={content}
                      showFullDescription
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Trend Analysis</h2>
              <TrendGraph />
            </CardContent>
          </Card>

          <TrendingInsights insights={insights} showViewAll={false} />
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-2 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
