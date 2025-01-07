# StaggeredContent Component

A component that displays content items with a staggered animation effect as they enter the viewport, with support for loading states.

## Features

- Staggered animation on content entry
- Intersection observer for viewport detection
- Loading state with skeleton UI
- Configurable animation timing
- Responsive layout

## Props

| Prop          | Type            | Required | Default | Description                             |
| ------------- | --------------- | -------- | ------- | --------------------------------------- |
| items         | `ContentItem[]` | Yes      | -       | Array of content items to display       |
| className     | `string`        | No       | -       | Additional CSS classes for container    |
| isLoading     | `boolean`       | No       | `false` | Whether the content is in loading state |
| skeletonCount | `number`        | No       | `3`     | Number of skeleton items to show        |

## Usage

```tsx
import { StaggeredContent } from "@/components/features/home/StaggeredContent/StaggeredContent";

// Basic usage
<StaggeredContent items={contentItems} />

// With loading state
<StaggeredContent
  items={contentItems}
  isLoading={true}
  skeletonCount={5}
  className="grid gap-4"
/>
```

## Animation

The component uses Framer Motion for animations:

- Items fade in and slide up
- Staggered delay between items (0.1s)
- Smooth easing function
- Triggers when content enters viewport
- One-time animation per item

## Loading State

When `isLoading` is true:

- Displays skeleton UI placeholders
- Maintains same layout as content
- Configurable number of placeholder items
- Smooth transition to content

## Styling

- Uses Tailwind CSS for layout
- Consistent spacing between items
- Responsive design support
- Compatible with grid and flex layouts
- Uses shadcn/ui skeleton component

## Testing

The component should be tested for:

- Animation triggering
- Loading state display
- Intersection observer behavior
- Content rendering
- Skeleton UI rendering
