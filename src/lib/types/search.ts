import { Author, Metrics } from "@/lib/types/shared";

export type SearchType =
  | "term"
  | "author"
  | "paper"
  | "repository"
  | "article"
  | "discussion";

export interface SearchParams {
  q: string;
  type?: SearchType[];
  dateRange?: string;
  from?: string;
  to?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  id: string;
  type: SearchType;
  title: string;
  description: string;
  authors?: Author[];
  date: string;
  tags?: string[];
  source?: string;
  sourceUrl?: string;
  metrics?: Metrics;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchSuggestion {
  id: string;
  type: SearchType;
  text: string;
}
