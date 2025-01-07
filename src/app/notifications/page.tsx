'use client';

import { useState } from 'react';
import { NotificationList } from '@/components/features/notifications/NotificationList/NotificationList';
import { mockNotifications } from '@/data/mock/mock-notifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, isRead: true }))
    );
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Notifications</h1>
        <p className="text-foreground/80 dark:text-foreground/90">
          Stay updated with mentions, comments, and collaboration invites
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription className="text-foreground/80 dark:text-foreground/90">
            Your recent notifications and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">
                All
                {notifications.length > 0 && ` (${notifications.length})`}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadNotifications.length > 0 && ` (${unreadNotifications.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <NotificationList
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            </TabsContent>

            <TabsContent value="unread" className="mt-4">
              <NotificationList
                notifications={unreadNotifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {readNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Previously Read</CardTitle>
            <CardDescription className="text-foreground/80 dark:text-foreground/90">
              Notifications you&apos;ve already seen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationList
              notifications={readNotifications}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
} 