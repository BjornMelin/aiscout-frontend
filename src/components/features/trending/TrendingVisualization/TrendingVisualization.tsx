"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import type { TrendingTopic } from "@/lib/types/trending";

interface TrendingVisualizationProps {
  topics: TrendingTopic[];
}

export function TrendingVisualization({ topics }: TrendingVisualizationProps) {
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(
    topics[0]?.id ?? null
  );

  const topic = topics.find((t) => t.id === selectedTopic);
  if (!topic) return null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {topics.slice(0, 5).map((t) => (
          <button
            key={t.id}
            className={`px-3 py-1 rounded-full text-sm ${
              t.id === selectedTopic
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
            onClick={() => setSelectedTopic(t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={topic.trendData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => format(new Date(value), "MMM d")}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) =>
                format(new Date(value as string), "MMM d, yyyy")
              }
              formatter={(value: number) => [value, "Score"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
