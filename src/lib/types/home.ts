export interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "paper" | "repository" | "article" | "discussion";
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

export interface CuratedContent {
  papers: ContentItem[];
  repositories: ContentItem[];
  articles: ContentItem[];
  discussions: ContentItem[];
}

export interface ContentSection {
  id: string;
  title: string;
  items: ContentItem[];
  type: "papers" | "repositories" | "articles" | "discussions";
}

export interface HomePageStore {
  curatedContent: CuratedContent;
  isLoading: boolean;
  error: Error | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fetch: () => Promise<void>;
}
