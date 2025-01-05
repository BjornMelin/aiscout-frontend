import { create } from "zustand";
import type { CuratedContent } from "@/lib/types/content";

interface HomePageStore {
  curatedContent: CuratedContent;
  isLoading: boolean;
  error: Error | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fetch: () => Promise<void>;
}

const INITIAL_CONTENT: CuratedContent = {
  papers: [],
  repositories: [],
  articles: [],
  discussions: [],
};

export const useHomePageStore = create<HomePageStore>((set) => ({
  curatedContent: INITIAL_CONTENT,
  isLoading: false,
  error: null,
  activeTab: "papers",

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  fetch: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/curated-content");
      const data = await response.json();
      set({ curatedContent: data, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));
