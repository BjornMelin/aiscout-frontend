import type { NotificationData } from "@/lib/types/notification";

export const mockNotifications: NotificationData[] = [
  {
    id: "1",
    type: "share",
    title: "New Share",
    message: "John Doe shared a folder with you",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionUrl: "/folders/shared",
    metadata: {
      senderId: "user-1",
      senderName: "John Doe",
      folderId: "folder-1",
      folderName: "AI Research Papers",
    },
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "Alice commented on your bookmark",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: "/bookmarks/1#comments",
    metadata: {
      senderId: "user-2",
      senderName: "Alice Smith",
      contentId: "bookmark-1",
    },
  },
  {
    id: "3",
    type: "system",
    title: "Welcome to AIScout",
    message:
      "Get started by exploring trending topics and creating your first collection",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: "/getting-started",
  },
];
