export type ContentType = "paper" | "repo" | "article" | "discussion";

export interface SearchParams {
  q: string;
  type?: ContentType[];
  dateRange?: string;
  from?: string;
  to?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  authors?: string[];
  date: string;
  tags?: string[];
  source?: string;
  sourceUrl?: string;
  metrics?: {
    citations?: number;
    stars?: number;
    comments?: number;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
