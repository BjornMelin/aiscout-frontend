import { create } from "zustand";
import type {
  ContentItem,
  ContentType,
  CuratedContent,
} from "../types/content";

interface ContentStore {
  // State
  curatedContent: CuratedContent;
  selectedContent: ContentItem | null;
  isLoading: boolean;
  error: Error | null;
  activeTab: ContentType;

  // Actions
  setActiveTab: (tab: ContentType) => void;
  fetchCuratedContent: (options?: {
    type?: ContentType;
    sort?: "popular" | "recent" | "trending";
    timeframe?: "day" | "week" | "month";
  }) => Promise<void>;
  fetchContentById: (id: string) => Promise<void>;
  bookmarkContent: (
    contentId: string,
    folderId?: string,
    note?: string
  ) => Promise<void>;
  removeBookmark: (contentId: string, folderId: string) => Promise<void>;
  clearError: () => void;
}

export const useContentStore = create<ContentStore>((set) => ({
  // Initial state
  curatedContent: {
    papers: [],
    repositories: [],
    articles: [],
    discussions: [],
  },
  selectedContent: null,
  isLoading: false,
  error: null,
  activeTab: "paper",

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  clearError: () => set({ error: null }),

  fetchCuratedContent: async (options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (options.type) params.set("type", options.type);
      if (options.sort) params.set("sort", options.sort);
      if (options.timeframe) params.set("timeframe", options.timeframe);

      const response = await fetch(`/api/curated-content?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch curated content");
      }

      const data = await response.json();
      set({ curatedContent: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching curated content:", error);
      set({
        error:
          error instanceof Error
            ? error
            : new Error("Failed to fetch curated content"),
        isLoading: false,
      });
    }
  },

  fetchContentById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/content/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const data = await response.json();
      set({ selectedContent: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching content:", error);
      set({
        error:
          error instanceof Error ? error : new Error("Failed to fetch content"),
        isLoading: false,
      });
    }
  },

  bookmarkContent: async (contentId, folderId, note) => {
    try {
      const url = folderId
        ? `/api/folders/${folderId}/items`
        : "/api/folders/default/items";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId,
          note,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to bookmark content");
      }
    } catch (error) {
      console.error("Error bookmarking content:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to bookmark content");
    }
  },

  removeBookmark: async (contentId, folderId) => {
    try {
      const response = await fetch(
        `/api/folders/${folderId}/items/${contentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to remove bookmark");
    }
  },
}));
