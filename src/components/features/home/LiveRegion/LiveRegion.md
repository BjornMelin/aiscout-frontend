# LiveRegion Component

A component for announcing dynamic content changes to screen readers, improving accessibility for users with visual impairments.

## Features

- Announces content changes to screen readers
- Configurable message duration
- Customizable ARIA roles and politeness levels
- Automatically cleans up after message timeout
- Screen reader only (visually hidden)

## Props

| Prop       | Type                               | Required | Default    | Description                          |
| ---------- | ---------------------------------- | -------- | ---------- | ------------------------------------ |
| message    | `string`                           | Yes      | -          | The message to be announced          |
| timeout    | `number`                           | No       | `5000`     | Time in ms before message is removed |
| role       | `"status" \| "alert" \| "log"`     | No       | `"status"` | ARIA role for the live region        |
| politeness | `"polite" \| "assertive" \| "off"` | No       | `"polite"` | ARIA live region politeness setting  |

## Usage

```tsx
import { LiveRegion } from "@/components/features/home/LiveRegion/LiveRegion";

// Basic usage
<LiveRegion message="Content has been updated" />

// With custom timeout and role
<LiveRegion
  message="Error loading content"
  timeout={3000}
  role="alert"
  politeness="assertive"
/>
```

## Accessibility

The component follows ARIA best practices for live regions:

- Uses appropriate ARIA roles and attributes
- Supports different politeness levels
- Ensures announcements are clear and concise
- Automatically manages announcement timing

## Common Use Cases

- Announcing loading states
- Confirming successful actions
- Alerting users to errors
- Announcing dynamic content updates
- Providing feedback for async operations

## Styling

- Visually hidden using `sr-only` class
- No visual impact on the UI
- Maintains accessibility without affecting layout

## Testing

The component should be tested for:

- Message announcement functionality
- Timeout behavior
- Role and politeness attribute rendering
- Component cleanup on unmount
