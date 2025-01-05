# NotificationPanel

A panel component that displays a list of notifications with actions to manage them.

## Features

- Displays a scrollable list of notifications
- Shows notification title, message, and timestamp
- Displays sender avatar when available
- Supports marking notifications as read
- Allows clearing individual or all notifications
- Empty state when no notifications are present
- Visual distinction between read and unread notifications

## Usage

```tsx
import { NotificationPanel } from "@/components/features/notifications";

export function NotificationsDropdown() {
  return (
    <div className="dropdown">
      <NotificationPanel />
    </div>
  );
}
```

## Notification Structure

Each notification in the panel follows this structure:

```typescript
interface NotificationData {
  id: string;
  type: "share" | "comment" | "follow" | "mention" | "system";
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

## Actions

The panel provides several actions for managing notifications:

### Mark as Read

- Individual notifications are marked as read when clicked
- "Mark all read" button appears when there are unread notifications

### Clear Notifications

- Each notification has a clear button
- "Clear all" button removes all notifications

## Accessibility

The component includes the following accessibility features:

- Proper heading structure
- Semantic HTML elements
- Interactive elements are keyboard accessible
- Clear visual feedback for interactions
- Screen reader friendly content structure

## Dependencies

- @/components/ui/button
- @/components/ui/scroll-area
- @/components/ui/avatar
- @/lib/store/notifications
- date-fns
- lucide-react
- next/navigation

## Technical Details

### State Management

The component uses the `useNotificationStore` Zustand store to manage:

- List of notifications
- Unread count
- Actions (mark as read, clear)

### Navigation

When a notification with an `actionUrl` is clicked:

```tsx
const handleNotificationClick = (notification: NotificationData) => {
  if (!notification.read) {
    markAsRead(notification.id);
  }

  if (notification.actionUrl) {
    router.push(notification.actionUrl);
  }
};
```

### Timestamp Formatting

Timestamps are formatted using `date-fns`:

```tsx
formatDistanceToNow(new Date(notification.createdAt), {
  addSuffix: true,
});
```

### Empty State

When there are no notifications:

```tsx
{notifications.length === 0 ? (
  <div className="flex flex-col items-center justify-center h-full">
    <p>No notifications</p>
  </div>
) : (
  // Notification list
)}
```

## Testing

The component includes comprehensive tests in `__tests__/NotificationPanel.test.tsx`:

```bash
# Run NotificationPanel tests
yarn test NotificationPanel
```

Key test cases:

- Renders empty state
- Displays notification list
- Handles mark as read action
- Handles clear notifications
- Shows/hides mark all read button
- Displays sender avatar with fallback
