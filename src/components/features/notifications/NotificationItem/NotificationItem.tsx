import { FC } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Check,
  AtSign,
  MessageSquare,
  Share2,
  Users,
  Bell,
  UserPlus,
  X,
} from "lucide-react";
import { Notification } from "@/lib/types/notification";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onClear?: (id: string) => void;
}

const notificationIcons = {
  mention: AtSign,
  comment: MessageSquare,
  share: Share2,
  follow: UserPlus,
  collaboration_invite: Users,
  system: Bell,
} as const;

export const NotificationItem: FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onClear,
}) => {
  const Icon =
    notificationIcons[notification.type as keyof typeof notificationIcons] ||
    Bell;
  const timeAgo = formatDistanceToNow(notification.createdAt, {
    addSuffix: true,
  });

  const handleClick = () => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClear) {
      onClear(notification.id);
    }
  };

  const Content = () => (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg border border-border transition-colors",
        !notification.isRead ? "bg-accent/50" : "bg-background",
        "hover:bg-accent cursor-pointer"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${notification.isRead ? "Read" : "Unread"} notification: ${
        notification.title
      }`}
    >
      {notification.sender ? (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={notification.sender.avatar}
            alt={notification.sender.name}
          />
          <AvatarFallback>
            {notification.sender.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <Icon className="h-4 w-4 text-foreground/80" />
        </div>
      )}

      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-foreground">
          {notification.title}
        </p>
        <p className="text-sm text-foreground/80 dark:text-foreground/90">
          {notification.message}
        </p>
        <p className="text-xs text-foreground/60">{timeAgo}</p>
      </div>

      <div className="flex gap-2">
        {!notification.isRead && onMarkAsRead && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground/80 hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(notification.id);
            }}
            aria-label="Mark as read"
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
        {onClear && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground/80 hover:text-foreground"
            onClick={handleClear}
            aria-label="Clear notification"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return notification.link ? (
    <Link href={notification.link} onClick={handleClick}>
      <Content />
    </Link>
  ) : (
    <Content />
  );
};
