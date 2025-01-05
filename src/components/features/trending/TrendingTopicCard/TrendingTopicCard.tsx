"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import type { TrendingTopic } from "@/lib/types/trending";

interface TrendingTopicCardProps {
  topic: TrendingTopic;
}

export function TrendingTopicCard({ topic }: TrendingTopicCardProps) {
  const router = useRouter();
  const isPositive = topic.change >= 0;
  const changeAbs = Math.abs(topic.change);

  const handleClick = () => {
    const params = new URLSearchParams({
      q: topic.name,
      sort: "recent",
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div
      className="p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <HoverCard>
          <HoverCardTrigger asChild>
            <h3 className="text-lg font-semibold hover:underline">
              {topic.name}
            </h3>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-semibold">Topic Overview</h4>
              <p className="text-sm text-muted-foreground">
                {topic.description}
              </p>
              <div className="pt-2">
                <h5 className="text-sm font-medium mb-1">Related Topics</h5>
                <div className="flex flex-wrap gap-1">
                  {topic.relatedTopics.map((related) => (
                    <span
                      key={related}
                      className="text-xs px-2 py-1 rounded-full bg-secondary"
                    >
                      {related}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <div className="flex items-center gap-1 text-sm">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {changeAbs}%
          </span>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Score: {topic.score}</span>
          <span>{topic.count} mentions</span>
        </div>
        <Progress value={topic.score} max={100} className="h-1" />
      </div>

      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>{topic.sources.papers} papers</span>
        <span>{topic.sources.repos} repos</span>
        <span>{topic.sources.articles} articles</span>
        <span>{topic.sources.discussions} discussions</span>
      </div>
    </div>
  );
}
