"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ChartBarIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface TrendingTopic {
  id: string;
  name: string;
  count: number;
  trend: number;
  description: string;
}

const MOCK_TRENDING_TOPICS: TrendingTopic[] = [
  {
    id: "1",
    name: "Large Language Models",
    count: 1234,
    trend: 25,
    description: "Recent developments in LLMs and their applications",
  },
  {
    id: "2",
    name: "Computer Vision",
    count: 890,
    trend: 15,
    description: "Advancements in image and video processing",
  },
  {
    id: "3",
    name: "Reinforcement Learning",
    count: 567,
    trend: 10,
    description: "Latest research in RL and robotics",
  },
];

function TrendingTopicCard({ topic }: { topic: TrendingTopic }) {
  return (
    <Card className="p-6 hover:bg-accent transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold">{topic.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {topic.description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ChartBarIcon className="w-4 h-4" />
          <span>{topic.count} discussions</span>
          <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
          <span className="text-green-500">+{topic.trend}%</span>
        </div>
      </div>
    </Card>
  );
}

export function TrendingSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Trending Topics</h2>
        <button className="text-sm text-primary hover:underline">
          View all topics
        </button>
      </div>

      <div className="grid gap-6">
        {MOCK_TRENDING_TOPICS.map((topic) => (
          <TrendingTopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}
