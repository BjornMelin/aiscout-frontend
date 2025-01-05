export type ContentType = "paper" | "repo" | "article" | "discussion";

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  affiliation?: string;
  bio?: string;
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
}

export interface Metrics {
  views: number;
  citations?: number;
  stars?: number;
  forks?: number;
  comments?: number;
}

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  authors: Author[];
  date: string;
  tags: Tag[];
  metrics: Metrics;
  url?: string;
}

export interface ResearchPaper extends BaseContent {
  type: "paper";
  abstract: string;
  doi?: string;
  journal?: string;
  pdfUrl?: string;
  citations: number;
}

export interface Repository extends BaseContent {
  type: "repo";
  language: string;
  stars: number;
  forks: number;
  lastCommit: string;
  readme?: string;
}

export interface Article extends BaseContent {
  type: "article";
  content: string;
  source: string;
  readTime?: number;
}

export interface Discussion extends BaseContent {
  type: "discussion";
  platform: string;
  threadUrl: string;
  participants: number;
  lastActivity: string;
}

export type ContentItem = ResearchPaper | Repository | Article | Discussion;
