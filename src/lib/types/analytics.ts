export interface ViewData {
  date: string;
  views: number;
  uniqueVisitors: number;
}

export interface TopContentItem {
  id: string;
  title: string;
  type: "paper" | "repository" | "article" | "discussion";
  views: number;
  interactions: number;
  savedCount: number;
}

export interface TopicDistributionItem {
  topic: string;
  count: number;
  percentage: number;
}

export interface AnalyticsData {
  viewsData: ViewData[];
  topContent: TopContentItem[];
  topicDistribution: TopicDistributionItem[];
  totalViews: number;
  totalInteractions: number;
  totalSaves: number;
}
