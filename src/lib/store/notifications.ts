import { create } from "zustand";
import type {
  NotificationStore,
  NotificationData,
} from "../types/notification";

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetch: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();

      set({
        notifications: data.notifications,
        unreadCount: data.notifications.filter((n: NotificationData) => !n.read)
          .length,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "POST" });

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1,
      }));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  },

  markAllAsRead: async () => {
    try {
      await fetch("/api/notifications/read-all", { method: "POST" });

      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  },

  clear: async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: "DELETE" });

      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.notifications.filter((n) => !n.read && n.id !== id)
          .length,
      }));
    } catch (error) {
      console.error("Failed to clear notification:", error);
    }
  },

  clearAll: async () => {
    try {
      await fetch("/api/notifications", { method: "DELETE" });
      set({ notifications: [], unreadCount: 0 });
    } catch (error) {
      console.error("Failed to clear all notifications:", error);
    }
  },
}));
