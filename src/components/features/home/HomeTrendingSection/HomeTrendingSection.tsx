"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingTopicCard } from "@/components/features/trending/TrendingTopicCard/TrendingTopicCard";
import { useTrendingStore } from "@/lib/store/trending";
import { useRouter } from "next/navigation";

export function HomeTrendingSection() {
  const { topics, isLoading, error, fetch } = useTrendingStore();
  const router = useRouter();

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  if (isLoading) {
    return <HomeTrendingSkeleton />;
  }

  if (error) {
    return <HomeTrendingError error={error} onRetry={fetch} />;
  }

  // Take only the top 3 trending topics
  const topTopics = topics.slice(0, 3);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Trending in AI/ML</h2>
        <Button variant="ghost" onClick={() => router.push("/trending")}>
          View all
        </Button>
      </div>

      <div className="space-y-4">
        {topTopics.map((topic) => (
          <TrendingTopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </Card>
  );
}

function HomeTrendingSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-10 w-20 bg-muted rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </Card>
  );
}

function HomeTrendingError({
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
