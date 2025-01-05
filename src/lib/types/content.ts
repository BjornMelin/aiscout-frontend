export type ContentType = "paper" | "repository" | "article" | "discussion";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: ContentType;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  metrics?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
}

export interface FetchContentOptions {
  type?: ContentType;
  limit?: number;
  sort?: "popular" | "recent" | "trending";
  timeframe?: "day" | "week" | "month";
  page?: number;
}
