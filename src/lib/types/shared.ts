export type ContentType = "paper" | "repository" | "article" | "discussion";

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  affiliation?: string;
  bio?: string;
}

export interface Source {
  name: string;
  url: string;
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
  lastCommit?: string;
  comments?: number;
  contributors?: number;
}
