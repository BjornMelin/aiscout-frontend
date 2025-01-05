"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingTopicCard } from "../TrendingTopicCard/TrendingTopicCard";
import { TrendingVisualization } from "../TrendingVisualization/TrendingVisualization";
import { useTrendingStore } from "@/lib/store/trending";
import type { TrendingStore, TrendingTopic } from "@/lib/types/trending";

export function TrendingSection() {
  const { topics, isLoading, error, timeframe, setTimeframe, fetch } =
    useTrendingStore();

  React.useEffect(() => {
    fetch();
    // Poll for updates every 5 minutes
    const interval = setInterval(fetch, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetch, timeframe]);

  if (isLoading) {
    return <TrendingSkeleton />;
  }

  if (error) {
    return <TrendingError error={error} onRetry={fetch} />;
  }

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value as TrendingStore["timeframe"]);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Trending in AI/ML</h2>
        <Tabs value={timeframe} onValueChange={handleTimeframeChange}>
          <TabsList>
            <TabsTrigger value="day">24h</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {topics.map((topic: TrendingTopic) => (
            <TrendingTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        <div className="hidden lg:block">
          <TrendingVisualization topics={topics} />
        </div>
      </div>
    </Card>
  );
}

function TrendingSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </Card>
  );
}

function TrendingError({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <Card className="p-6 text-center">
      <p className="text-destructive mb-4">{error.message}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </Card>
  );
}
