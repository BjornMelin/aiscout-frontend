import { create } from "zustand";
import type { HomePageStore, CuratedContent } from "../types/home";

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
      const response = await fetch("/api/curated-content", {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch curated content");
      }

      const data = await response.json();
      set({ 
        curatedContent: {
          papers: data.papers || [],
          repositories: data.repositories || [],
          articles: data.articles || [],
          discussions: data.discussions || [],
        },
        isLoading: false 
      });
    } catch (error) {
      console.error("Error fetching curated content:", error);
      set({ error: error as Error, isLoading: false });
    }
  },
}));
