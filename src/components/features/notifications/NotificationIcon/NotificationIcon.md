# NotificationIcon

A notification icon component that displays a bell icon with an unread count badge and a hover panel showing notifications.

## Features

- Displays a bell icon with customizable variant
- Shows unread notification count as a badge
- Polls for new notifications every 30 seconds
- Opens a notification panel on hover
- Accessible with proper ARIA labels

## Usage

```tsx
import { NotificationIcon } from '@/components/features/notifications';

export function Header() {
  return (
    <header>
      <NotificationIcon variant="ghost" />
    </header>
  );
}
```

## Props

| Name    | Type                                | Default  | Description                                |
|---------|-------------------------------------|----------|--------------------------------------------|
| variant | 'default' \| 'outline' \| 'ghost'   | 'ghost'  | The visual style variant of the icon      |

## Examples

### Default Variant

```tsx
<NotificationIcon />
```

### Outline Variant

```tsx
<NotificationIcon variant="outline" />
```

### Ghost Variant

```tsx
<NotificationIcon variant="ghost" />
```

## Accessibility

The component includes the following accessibility features:

- ARIA label that includes the unread count
- Interactive elements are keyboard accessible
- Proper focus management
- Screen reader announcements for new notifications

## Dependencies

- @/components/ui/badge
- @/components/ui/button
- @/components/ui/hover-card
- @/lib/store/notifications
- lucide-react

## Technical Details

### State Management

The component uses the `useNotificationStore` Zustand store to manage:
- Unread notification count
- Fetching notifications
- Polling for new notifications

### Polling

The component sets up a polling interval to fetch new notifications every 30 seconds:

```tsx
React.useEffect(() => {
  fetch();
  const interval = setInterval(fetch, 30000);
  return () => clearInterval(interval);
}, [fetch]);
```

### Badge Display

The badge is only shown when there are unread notifications, and displays "99+" when the count exceeds 99:

```tsx
{unreadCount > 0 && (
  <Badge variant="destructive">
    {unreadCount > 99 ? "99+" : unreadCount}
  </Badge>
)}
```

## Testing

The component includes comprehensive tests in `__tests__/NotificationIcon.test.tsx`:

```bash
# Run NotificationIcon tests
yarn test NotificationIcon
```

Key test cases:
- Renders without unread notifications
- Displays unread count badge
- Handles polling for notifications
- Cleans up polling interval
- Applies custom variants 