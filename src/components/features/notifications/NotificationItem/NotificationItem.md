# NotificationItem

A reusable component that displays a single notification with various interactive features and visual states.

## Features

- Displays notification title, message, and timestamp
- Shows sender avatar with fallback icon
- Supports read/unread states with visual distinction
- Provides mark as read and clear actions
- Renders as a link when actionUrl is provided
- Fully accessible with keyboard navigation and ARIA labels
- Responsive design with hover states

## Usage

```tsx
import { NotificationItem } from "@/components/features/notifications";

// Basic usage
<NotificationItem notification={notification} />

// With all features enabled
<NotificationItem
  notification={notification}
  onMarkAsRead={handleMarkAsRead}
  onClear={handleClear}
/>
```

## Props

| Name         | Type                 | Required | Description                                |
| ------------ | -------------------- | -------- | ------------------------------------------ |
| notification | NotificationData     | Yes      | The notification object to display         |
| onMarkAsRead | (id: string) => void | No       | Callback when marking notification as read |
| onClear      | (id: string) => void | No       | Callback when clearing the notification    |

## NotificationData Structure

```typescript
interface NotificationData {
  id: string;
  type:
    | "mention"
    | "comment"
    | "share"
    | "follow"
    | "collaboration_invite"
    | "system";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    sender?: {
      id: string;
      name: string;
      email: string;
      displayImage?: string;
    };
  };
}
```

## Examples

### Basic Notification

```tsx
const notification = {
  id: "1",
  type: "comment",
  title: "New Comment",
  message: "Someone commented on your post",
  createdAt: new Date().toISOString(),
  read: false,
};

<NotificationItem notification={notification} />;
```

### Notification with Sender

```tsx
const notificationWithSender = {
  id: "2",
  type: "mention",
  title: "New Mention",
  message: "John mentioned you in a comment",
  createdAt: new Date().toISOString(),
  read: false,
  metadata: {
    sender: {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      displayImage: "https://example.com/avatar.jpg",
    },
  },
};

<NotificationItem notification={notificationWithSender} />;
```

### Interactive Notification

```tsx
const handleMarkAsRead = (id: string) => {
  // Mark notification as read
};

const handleClear = (id: string) => {
  // Clear notification
};

<NotificationItem
  notification={notification}
  onMarkAsRead={handleMarkAsRead}
  onClear={handleClear}
/>;
```

## Styling

The component uses Tailwind CSS for styling and supports:

- Different background colors for read/unread states
- Hover effects for interactive elements
- Responsive layout
- Dark mode support

## Accessibility

The component includes several accessibility features:

- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Clear visual feedback for interactions
- Screen reader friendly content structure

## Dependencies

- @/components/ui/avatar
- @/components/ui/button
- @/lib/types/notification
- @/lib/types/userAuth
- @/lib/utils
- date-fns
- lucide-react
- next/link

## Technical Details

### Read/Unread State

The component applies different styles based on the notification's read state:

```tsx
className={cn(
  'flex items-start gap-4 p-4 rounded-lg border border-border transition-colors',
  !notification.read ? 'bg-accent/50' : 'bg-background',
  'hover:bg-accent cursor-pointer'
)}
```

### Timestamp Formatting

Timestamps are formatted using date-fns:

```tsx
formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });
```

### Action Handling

The component handles various actions with proper event propagation:

```tsx
const handleClick = () => {
  if (!notification.read && onMarkAsRead) {
    onMarkAsRead(notification.id);
  }
};

const handleClear = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (onClear) {
    onClear(notification.id);
  }
};
```

## Testing

The component includes comprehensive tests in `__tests__/NotificationItem.test.tsx`:

```bash
# Run NotificationItem tests
yarn test NotificationItem
```

Key test cases:

- Renders notification content correctly
- Displays sender avatar when available
- Handles mark as read and clear actions
- Applies correct styles for read/unread states
- Renders as a link when actionUrl is provided
