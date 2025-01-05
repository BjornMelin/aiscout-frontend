# HomeErrorBoundary Component

The HomeErrorBoundary component is a React error boundary that catches and handles errors in the home page component tree.

## Features

- Catches runtime errors in child components
- Displays user-friendly error message
- Provides retry functionality
- Logs errors to console for debugging

## Usage

```tsx
import { HomeErrorBoundary } from "@/components/features/home/HomeErrorBoundary/HomeErrorBoundary";

export default function HomePage() {
  return (
    <HomeErrorBoundary>
      <main>{/* Home page content */}</main>
    </HomeErrorBoundary>
  );
}
```

## Props

| Name     | Type      | Description                                              |
| -------- | --------- | -------------------------------------------------------- |
| children | ReactNode | The child components to be wrapped by the error boundary |

## Technical Details

- Extends React.Component with error boundary lifecycle methods
- Uses shadcn/ui Button component for retry action
- Implements error state management
- Provides error recovery through page reload

## Error Handling

1. Catches errors during:
   - Rendering
   - Lifecycle methods
   - Event handlers
2. Provides fallback UI with:
   - Error message display
   - Retry button
   - Error logging

## Accessibility

- Error messages are properly announced to screen readers
- Retry button is keyboard accessible
- Clear error state indication
- Focus management during error states
