export type NotificationType =
  | "share"
  | "comment"
  | "follow"
  | "mention"
  | "system";

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    contentId?: string;
    contentType?: string;
    senderId?: string;
    senderName?: string;
    senderAvatar?: string;
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
