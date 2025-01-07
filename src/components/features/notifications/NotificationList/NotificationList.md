# NotificationList

A comprehensive notification component that combines a notification icon with a hover panel displaying a list of notifications. This component handles real-time updates, notification management, and user interactions.

## Features

- Notification icon with unread count badge
- Hover panel with scrollable notification list
- Real-time notification updates via polling
- Mark all as read functionality
- Clear all notifications option
- Empty state handling
- Fully accessible design
- Responsive layout

## Usage

```tsx
import { NotificationList } from "@/components/features/notifications";

// Basic usage
<NotificationList />

// With custom variant
<NotificationList variant="outline" />
```

## Props

| Name    | Type                              | Default | Description                          |
| ------- | --------------------------------- | ------- | ------------------------------------ |
| variant | 'default' \| 'outline' \| 'ghost' | 'ghost' | The visual style variant of the icon |

## Examples

### Basic Implementation

```tsx
function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      <div className="flex items-center gap-4">
        <NotificationList />
        <UserMenu />
      </div>
    </header>
  );
}
```

### Custom Variant

```tsx
<NotificationList variant="outline" />
```

## Styling

The component uses Tailwind CSS for styling and includes:

- Customizable icon variants
- Badge styling for unread count
- Hover card panel layout
- Scrollable notification list
- Dark mode support

## State Management

The component uses the `useNotificationStore` Zustand store to manage:

```typescript
interface NotificationStore {
  notifications: NotificationData[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clear: (id: string) => void;
  clearAll: () => void;
  fetch: () => Promise<void>;
}
```

## Real-time Updates

The component implements polling for real-time updates:

```tsx
React.useEffect(() => {
  fetch();
  const interval = setInterval(fetch, 30000); // Poll every 30 seconds
  return () => clearInterval(interval);
}, [fetch]);
```

## Accessibility

The component includes several accessibility features:

- ARIA labels for notification counts
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast visual states

## Dependencies

- @/components/ui/badge
- @/components/ui/button
- @/components/ui/hover-card
- @/components/ui/scroll-area
- @/lib/store/notifications
- @/components/features/notifications/NotificationItem
- lucide-react

## Technical Details

### Unread Count Badge

The badge is displayed with special handling for large numbers:

```tsx
{
  unreadCount > 0 && (
    <Badge
      variant="destructive"
      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
    >
      {unreadCount > 99 ? "99+" : unreadCount}
    </Badge>
  );
}
```

### Hover Card Panel

The notification list is displayed in a hover card:

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <Button>{/* Icon and badge */}</Button>
  </HoverCardTrigger>
  <HoverCardContent>{/* Notification list content */}</HoverCardContent>
</HoverCard>
```

### Empty State

The component handles empty states gracefully:

```tsx
{notifications.length === 0 ? (
  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
    <p>No notifications</p>
  </div>
) : (
  // Notification list
)}
```

## Testing

The component includes comprehensive tests in `__tests__/NotificationList.test.tsx`:

```bash
# Run NotificationList tests
yarn test NotificationList
```

Key test cases:

- Renders notification icon with badge
- Displays 99+ for large unread counts
- Shows empty state when appropriate
- Handles mark all read action
- Manages polling lifecycle
- Applies custom variants

## Best Practices

1. **Performance**

   - Uses efficient polling interval
   - Implements cleanup on unmount
   - Optimizes re-renders

2. **User Experience**

   - Clear visual feedback
   - Intuitive interactions
   - Responsive design

3. **Accessibility**

   - Proper ARIA attributes
   - Keyboard navigation
   - Screen reader support

4. **Maintainability**
   - Modular design
   - Clear component structure
   - Comprehensive documentation

## Integration

To integrate with your notification system:

1. Set up the notification store:

```tsx
// lib/store/notifications.ts
import create from "zustand";
import { NotificationStore } from "@/lib/types/notification";

export const useNotificationStore = create<NotificationStore>((set) => ({
  // Implementation
}));
```

2. Configure the polling interval if needed:

```tsx
// components/features/notifications/NotificationList.tsx
const POLL_INTERVAL = 30000; // 30 seconds
```

3. Add to your layout:

```tsx
// app/layout.tsx
import { NotificationList } from "@/components/features/notifications";

export default function RootLayout() {
  return (
    <div>
      <header>
        <NotificationList />
      </header>
      {/* Rest of your layout */}
    </div>
  );
}
```
