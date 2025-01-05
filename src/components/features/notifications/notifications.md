# AIScout Notification System

A comprehensive real-time notification system for AIScout that handles user notifications for sharing events, comments, and other user interactions.

## Features

- Real-time notifications via WebSocket
- Unread notification count badge
- Toast notifications for new events
- Notification panel with list view
- Mark as read/unread functionality
- Clear individual or all notifications
- Responsive and accessible design

## Installation

```bash
# Install notification-related dependencies
yarn add zustand
yarn add @tanstack/react-query
yarn add date-fns
yarn add sonner  # For toast notifications

# Install required shadcn/ui components
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add hover-card
npx shadcn-ui@latest add avatar
```

## Components

The notification system consists of several components:

- [NotificationIcon](./NotificationIcon/README.md) - Bell icon with unread count badge
- [NotificationPanel](./NotificationPanel/README.md) - Panel displaying notification list

## Usage

### Basic Setup

1. Add WebSocket URL to your environment variables:

```env
NEXT_PUBLIC_WS_URL=wss://your-websocket-server.com/notifications
```

2. Add the notification icon to your header:

```tsx
import { NotificationIcon } from "@/components/features/notifications";

export function Header() {
  return (
    <header>
      <NotificationIcon />
    </header>
  );
}
```

3. Initialize WebSocket connection in your root layout:

```tsx
import { setupNotificationWebSocket } from "@/lib/utils/notifications";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const ws = setupNotificationWebSocket();
    return () => ws?.close();
  }, []);

  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" expand={true} richColors />
      </body>
    </html>
  );
}
```

## API Reference

### Notification Types

```typescript
type NotificationType = "share" | "comment" | "follow" | "mention" | "system";

interface NotificationData {
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
```

### Store Actions

```typescript
interface NotificationStore {
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
```

## Required Backend Endpoints

The notification system expects the following API endpoints:

| Endpoint                      | Method | Description                    |
| ----------------------------- | ------ | ------------------------------ |
| `/api/notifications`          | GET    | Fetch all notifications        |
| `/api/notifications/:id/read` | POST   | Mark a notification as read    |
| `/api/notifications/read-all` | POST   | Mark all notifications as read |
| `/api/notifications/:id`      | DELETE | Delete a specific notification |
| `/api/notifications`          | DELETE | Delete all notifications       |

## WebSocket Events

The WebSocket server should send notifications in the following format:

```typescript
{
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    // Optional metadata fields
  };
}
```

## Accessibility

The notification system includes several accessibility features:

- ARIA labels for notification counts
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast visual states

## Testing

The notification system includes comprehensive tests:

```bash
# Run all tests
yarn test

# Run specific test files
yarn test NotificationIcon
yarn test NotificationPanel
yarn test notifications.store
```

## Contributing

1. Follow the existing code style
2. Add tests for any new features
3. Update documentation as needed
4. Ensure all tests pass before submitting PR
