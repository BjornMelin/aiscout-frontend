import { ContentItem } from "./content";

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
