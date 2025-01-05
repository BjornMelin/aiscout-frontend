import { create } from "zustand";
import type { Folder } from "@/lib/types/folder";
import * as api from "@/lib/api/folders";

interface FoldersState {
  folders: Folder[];
  isLoading: boolean;
  error: Error | null;
  fetch: () => Promise<void>;
  create: (data: { name: string; description?: string }) => Promise<Folder>;
  update: (
    folderId: string,
    data: { name?: string; description?: string }
  ) => Promise<Folder>;
  delete: (folderId: string) => Promise<void>;
  reset: () => void;
}

export const useFoldersStore = create<FoldersState>((set) => ({
  folders: [],
  isLoading: false,
  error: null,
  fetch: async () => {
    set({ isLoading: true, error: null });
    try {
      const folders = await api.getFolders();
      set({ folders, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch folders";
      console.error("Fetch folders error:", error);
      set({ error: new Error(errorMessage), isLoading: false });
      throw error;
    }
  },
  create: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const folder = await api.createFolder(data);
      set((state) => ({
        folders: [...state.folders, folder],
        isLoading: false,
      }));
      return folder;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create folder";
      console.error("Create folder error:", error);
      set({ error: new Error(errorMessage), isLoading: false });
      throw error;
    }
  },
  update: async (folderId, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedFolder = await api.updateFolder(folderId, data);
      set((state) => ({
        folders: state.folders.map((f) =>
          f.id === folderId ? updatedFolder : f
        ),
        isLoading: false,
      }));
      return updatedFolder;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update folder";
      console.error("Update folder error:", error);
      set({ error: new Error(errorMessage), isLoading: false });
      throw error;
    }
  },
  delete: async (folderId) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteFolder(folderId);
      set((state) => ({
        folders: state.folders.filter((f) => f.id !== folderId),
        isLoading: false,
      }));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete folder";
      console.error("Delete folder error:", error);
      set({ error: new Error(errorMessage), isLoading: false });
      throw error;
    }
  },
  reset: () => {
    set({ folders: [], isLoading: false, error: null });
  },
}));
