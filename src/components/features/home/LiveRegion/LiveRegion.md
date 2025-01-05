# LiveRegion Component

The LiveRegion component provides an accessible way to announce dynamic content changes to screen readers.

## Features

- ARIA live region for screen reader announcements
- Configurable message timeout
- Automatic cleanup
- Polite announcement mode
- Invisible to sighted users

## Usage

```tsx
import { LiveRegion } from "@/components/features/home/LiveRegion/LiveRegion";

export function ContentSection() {
  return (
    <div>
      <ContentList />
      <LiveRegion message="New content loaded" timeout={3000} />
    </div>
  );
}
```

## Props

| Name     | Type   | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| message  | string | The message to be announced                                    |
| timeout? | number | Time in milliseconds before message is cleared (default: 5000) |

## Technical Details

- Uses React's useEffect for cleanup
- Implements ARIA live region
- Screen reader only visibility
- Automatic state management
- Configurable timing

## Accessibility

- Uses aria-live="polite" for non-intrusive announcements
- Properly hidden from visual display
- Respects user's screen reader settings
- Clean message queue management

## Best Practices

- Keep messages concise and meaningful
- Use polite announcements for non-critical updates
- Clear messages after appropriate timeout
- Avoid rapid successive announcements
