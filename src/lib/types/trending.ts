export interface TrendingTopic {
  id: string;
  name: string;
  score: number;
  change: number;
  count: number;
  timeframe: "day" | "week" | "month";
  sources: {
    papers: number;
    repos: number;
    articles: number;
    discussions: number;
  };
  relatedTopics: string[];
  description?: string;
  trendData: TrendPoint[];
}

export interface TrendPoint {
  timestamp: string;
  value: number;
}

export interface TopicMetrics {
  totalMentions: number;
  paperCitations: number;
  repoStars: number;
  discussionEngagement: number;
}

export interface TrendingStore {
  topics: TrendingTopic[];
  isLoading: boolean;
  error: Error | null;
  timeframe: "day" | "week" | "month";
  setTimeframe: (timeframe: "day" | "week" | "month") => void;
  fetch: () => Promise<void>;
}
