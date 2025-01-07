import { Author, Source, Metrics, Tag, ContentType } from "./shared";

export interface Reference {
  id: string;
  title: string;
  authors: string[];
  year: string;
  url?: string;
}

export interface RelatedContent {
  id: string;
  type: ContentType;
  title: string;
  authors: string[];
  description?: string;
}

export interface ProgrammingLanguage {
  name: string;
  percentage: number;
}

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  authors: Author[];
  sources: Source[];
  date: string;
  metrics: Metrics;
  tags: Tag[];
  isBookmarked: boolean;
  featured: boolean;
}

export interface Paper extends BaseContent {
  type: "paper";
  abstract: string;
  // doi?: string;
  content: string;
  journal?: string;
  pdfUrl?: string;
  references: Reference[];
  relatedContent: RelatedContent[];
}

export interface Repository extends BaseContent {
  type: "repository";
  readmeContent?: string;
  repositoryUrl: string;
  programmingLanguages: ProgrammingLanguage[];
  relatedContent: RelatedContent[];
}

export interface Article extends BaseContent {
  type: "article";
  content: string;
  relatedContent: RelatedContent[];
  readTime?: number;
}

export interface Discussion extends BaseContent {
  type: "discussion";
  platform: string;
  threadUrl: string;
  participants: Author[];
  participantsCount: number;
  lastActivity: string;
  relatedContent: RelatedContent[];
}

export type ContentItem = Paper | Repository | Article | Discussion;

export type ContentMap = Record<string, ContentItem>;
