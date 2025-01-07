import { ContentItem } from "@/lib/types/content";
import { Tag } from "@/lib/types/shared";

// Trending timeframes
export type TrendingTimeframe = "day" | "week" | "month";

// Trending metrics
export interface TrendingMetrics {
  score: number;
  change: number;
  timeframe: TrendingTimeframe;
  count?: number;
}

// Topic metrics
export interface TopicMetrics {
  totalMentions: number;
  paperCitations: number;
  repoStars: number;
  discussionEngagement: number;
}

// Trending point is a point in time with a value
export interface TrendPoint {
  timestamp: string;
  value: number;
}

// Trending topic
export interface TrendingTopic {
  id: string;
  title: string;
  description?: string;
  tags: Tag[];
  sources: {
    papers: number;
    repos: number;
    articles: number;
    discussions: number;
  };
  relatedContent: {
    papers: number;
    repositories: number;
    articles: number;
    discussions: number;
  };
  trendData: TrendPoint[];
  topicMetrics: TopicMetrics;
  trendMetrics: TrendingMetrics;
}

// Trending content is a content item with trending metrics
export type TrendingContent = ContentItem & {
  trendMetrics: TrendingMetrics;
};

// Trending insight is an insight about a trending topic
export interface TrendingInsight {
  id: string;
  topic: string;
  insight: string;
  source: string;
  date: string;
  url: string;
  trendingScore?: number;
}

// Trending store is a store for trending data
export interface TrendingStore {
  topics: TrendingTopic[];
  isLoading: boolean;
  error: Error | null;
  timeframe: TrendingTimeframe;
  setTimeframe: (timeframe: TrendingTimeframe) => void;
  fetch: () => Promise<void>;
}
