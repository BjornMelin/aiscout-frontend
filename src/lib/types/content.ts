export type ContentType = "paper" | "repository" | "article" | "discussion";

export interface BaseContentItem {
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
    citations?: number;
  };
  tags?: string[];
}

export interface Paper extends BaseContentItem {
  type: "paper";
  authors: { name: string; affiliation?: string }[];
  doi?: string;
  abstract?: string;
  journal?: string;
  publishedDate: string;
}

export interface Repository extends BaseContentItem {
  type: "repository";
  owner: string;
  language: string;
  stars: number;
  forks: number;
  lastCommit: string;
  readme?: string;
}

export interface Article extends BaseContentItem {
  type: "article";
  readTime?: number;
  source: string;
}

export interface Discussion extends BaseContentItem {
  type: "discussion";
  participants: number;
  lastActivity: string;
  platform: string;
}

export type ContentItem = Paper | Repository | Article | Discussion;

export interface CuratedContent {
  papers: Paper[];
  repositories: Repository[];
  articles: Article[];
  discussions: Discussion[];
}

export interface FetchContentOptions {
  type?: ContentType;
  limit?: number;
  sort?: "popular" | "recent" | "trending";
  timeframe?: "day" | "week" | "month";
  page?: number;
}

// Type guards
export function isPaper(content: ContentItem): content is Paper {
  return content.type === "paper";
}

export function isRepository(content: ContentItem): content is Repository {
  return content.type === "repository";
}

export function isArticle(content: ContentItem): content is Article {
  return content.type === "article";
}

export function isDiscussion(content: ContentItem): content is Discussion {
  return content.type === "discussion";
}
