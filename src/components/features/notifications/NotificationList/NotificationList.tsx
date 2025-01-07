import { FC } from "react";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { Notification } from "@/lib/types/notification";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Trash2 } from "lucide-react";
import { useNotificationStore } from "@/lib/store/notifications";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface NotificationListProps {
  variant?: "default" | "outline" | "ghost";
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

export const NotificationList: FC<NotificationListProps> = ({
  variant = "ghost",
  notifications: propNotifications,
  onMarkAsRead: propMarkAsRead,
  onMarkAllAsRead: propMarkAllAsRead,
}) => {
  const store = useNotificationStore();
  const {
    notifications: storeNotifications,
    unreadCount,
    markAsRead: storeMarkAsRead,
    markAllAsRead: storeMarkAllAsRead,
    clear,
    clearAll,
    fetch,
  } = store;

  const notifications = propNotifications || storeNotifications;
  const markAsRead = propMarkAsRead || storeMarkAsRead;
  const markAllAsRead = propMarkAllAsRead || storeMarkAllAsRead;

  React.useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [fetch]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className="relative"
          aria-label={`Notifications ${
            unreadCount > 0 ? `(${unreadCount} unread)` : ""
          }`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </HoverCardTrigger>

      <HoverCardContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Notifications
              {unreadCount > 0 && ` (${unreadCount})`}
            </h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[300px]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <p>No notifications</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((notification: Notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onClear={clear}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
