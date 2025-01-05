import { create } from "zustand";
import type { TrendingStore } from "../types/trending";

export const useTrendingStore = create<TrendingStore>((set, get) => ({
  topics: [],
  isLoading: false,
  error: null,
  timeframe: "week",

  setTimeframe: (timeframe) => {
    set({ timeframe });
    // Fetch new data when timeframe changes
    get().fetch();
  },

  fetch: async () => {
    const { timeframe } = get();
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/trending?timeframe=${timeframe}`);
      if (!response.ok) {
        throw new Error("Failed to fetch trending topics");
      }
      const data = await response.json();
      set({ topics: data.topics, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));
