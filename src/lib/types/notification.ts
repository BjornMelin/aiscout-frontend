import { ContentType } from "@/lib/types/shared";

export type NotificationType =
  | "share"
  | "comment"
  | "follow"
  | "mention"
  | "collaboration_invite"
  | "system";

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: Date;
  link?: string;
  isRead: boolean;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: {
    contentId?: string;
    contentType?: ContentType;
    folderId?: string;
    folderName?: string;
  };
}

export interface NotificationStore {
  notifications: NotificationData[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  fetch: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clear: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}
