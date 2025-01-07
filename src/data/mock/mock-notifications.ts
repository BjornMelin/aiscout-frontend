import type { NotificationData } from "../../lib/types/notification";

export const mockNotifications: NotificationData[] = [
  {
    id: "1",
    type: "share",
    title: "New Share",
    message: "John Doe shared a folder with you",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    sender: {
      id: "user-1",
      name: "John Doe",
    },
    metadata: {
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
    isRead: false,
    sender: {
      id: "user-2",
      name: "Alice Smith",
    },
    metadata: {
      contentId: "bookmark-1",
      contentType: "paper",
    },
  },
  {
    id: "3",
    type: "system",
    title: "Welcome to AIScout",
    message:
      "Get started by exploring trending topics and creating your first collection",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    sender: {
      id: "system",
      name: "System",
    },
  },
];
