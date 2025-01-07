# HomeErrorBoundary Component

A React error boundary component specifically designed for handling errors in the home page components.

## Features

- Catches and displays runtime errors
- Provides a user-friendly error message
- Includes a retry button
- Consistent styling with the application design
- Error logging functionality

## Props

| Prop     | Type        | Required | Description                    |
| -------- | ----------- | -------- | ------------------------------ |
| children | `ReactNode` | Yes      | Child components to be wrapped |

## Usage

```tsx
import { HomeErrorBoundary } from "@/components/features/home/HomeErrorBoundary/HomeErrorBoundary";

<HomeErrorBoundary>
  <YourHomeComponent />
</HomeErrorBoundary>;
```

## Error Handling

The component:

- Catches JavaScript errors in child components
- Displays a user-friendly error message using the Alert component
- Provides a "Try again" button that reloads the page
- Logs errors to the console in development

## Error UI

When an error occurs, the component displays:

- An alert with an error icon
- The error message (if available)
- A fallback message if no specific error message is available
- A "Try again" button

## Styling

- Uses shadcn/ui Alert and Button components
- Consistent with the application's design system
- Responsive layout
- Centered content with appropriate spacing

## Testing

The component should be tested for:

- Error catching functionality
- Error message display
- Retry button functionality
- Component recovery after error
