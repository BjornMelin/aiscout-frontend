# StaggeredContent Component

The StaggeredContent component provides an animated grid layout that reveals content items in a staggered sequence as they enter the viewport.

## Features

- Staggered animation on scroll
- Intersection observer for viewport detection
- Customizable animation timing
- Reusable with any content items
- Optional CSS class customization

## Usage

```tsx
import { StaggeredContent } from "@/components/features/home/StaggeredContent/StaggeredContent";
import type { ContentItem } from "@/lib/types/content";

export function ContentGrid({ items }: { items: ContentItem[] }) {
  return (
    <StaggeredContent
      items={items}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    />
  );
}
```

## Props

| Name       | Type          | Description                            |
| ---------- | ------------- | -------------------------------------- |
| items      | ContentItem[] | Array of content items to display      |
| className? | string        | Optional CSS classes for the container |

## Technical Details

- Uses Framer Motion for animations
- Implements react-intersection-observer for viewport detection
- Custom animation controls for staggered effect
- Integrates with ContentCard component
- Responsive design support

## Animation

- Fade in and slide up animation
- 100ms delay between each item
- Triggers when 10% of element is in viewport
- One-time animation (doesn't repeat on re-entry)

## Performance

- Lazy animation triggering
- Optimized re-renders
- Efficient intersection observer usage
- Minimal layout shifts
