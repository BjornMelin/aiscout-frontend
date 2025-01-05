"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useNotificationStore } from "@/lib/store/notifications";
import { NotificationPanel } from "../NotificationPanel/NotificationPanel";

interface NotificationIconProps {
  variant?: "default" | "outline" | "ghost";
}

export function NotificationIcon({ variant = "ghost" }: NotificationIconProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { unreadCount, fetch } = useNotificationStore();

  React.useEffect(() => {
    fetch();

    // Set up polling for notifications
    const interval = setInterval(fetch, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [fetch]);

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
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
        <NotificationPanel />
      </HoverCardContent>
    </HoverCard>
  );
}
