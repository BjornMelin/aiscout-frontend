import { create } from "zustand";
import type { BookmarkedItem } from "../types/folder";
import * as api from "../api/folders";

interface FolderContentsState {
  items: BookmarkedItem[];
  isLoading: boolean;
  error: Error | null;
  currentFolderId: string | null;
  fetch: (folderId: string) => Promise<void>;
  reorder: (orderedIds: string[]) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
}

export const useFolderContentsStore = create<FolderContentsState>(
  (set, get) => ({
    items: [],
    isLoading: false,
    error: null,
    currentFolderId: null,
    fetch: async (folderId) => {
      set({ isLoading: true, error: null, currentFolderId: folderId });
      try {
        const items = await api.getFolderContents(folderId);
        set({ items, isLoading: false });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch folder contents";
        console.error("Fetch folder contents error:", error);
        set({ error: new Error(errorMessage), isLoading: false });
        throw error;
      }
    },
    reorder: async (orderedIds) => {
      const { currentFolderId } = get();
      if (!currentFolderId) return;

      try {
        await api.reorderFolderContents(currentFolderId, orderedIds);
        const items = [...get().items];
        const orderedItems = orderedIds.map(
          (id) => items.find((item) => item.id === id)!
        );
        set({ items: orderedItems });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to reorder items";
        console.error("Reorder items error:", error);
        throw new Error(errorMessage);
      }
    },
    remove: async (itemId) => {
      const { currentFolderId } = get();
      if (!currentFolderId) return;

      try {
        await api.removeFromFolder(currentFolderId, itemId);
        set({ items: get().items.filter((item) => item.id !== itemId) });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to remove item";
        console.error("Remove item error:", error);
        throw new Error(errorMessage);
      }
    },
  })
);
