import { ContentItem } from "@/lib/types/content";
import { ContentType } from "@/lib/types/shared";

// Curated content is a collection of content items
export interface CuratedContent {
  papers: ContentItem[];
  repositories: ContentItem[];
  articles: ContentItem[];
  discussions: ContentItem[];
}

// OLD VERSION
// export interface CuratedSection {
//   id: string;
//   title: string;
//   description: string;
//   items: ContentItem[];
// }

// Content section is a section of content items
export interface ContentSection {
  id: string;
  title: string;
  items: ContentItem[];
  type: ContentType;
}

// Home page store is a store for the home page
export interface HomePageStore {
  curatedContent: CuratedContent;
  isLoading: boolean;
  error: Error | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fetch: () => Promise<void>;
}
