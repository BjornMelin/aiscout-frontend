# HomeTrendingSection Component

A component that displays trending topics and content in a card-based layout for the AI/ML content discovery platform.

## Features

- Displays top 5 trending topics
- Displays top 5 trending content items
- Trend indicators with color-coded arrows
- Loading state with skeleton UI
- Responsive design

## Props

| Prop      | Type      | Required | Default | Description                                    |
| --------- | --------- | -------- | ------- | ---------------------------------------------- |
| isLoading | `boolean` | No       | `false` | Whether the component is in a loading state    |

## Usage

```tsx
import { HomeTrendingSection } from "@/components/features/home/HomeTrendingSection/HomeTrendingSection";

// Basic usage
<HomeTrendingSection />

// With loading state
<HomeTrendingSection isLoading={true} />
```

## Loading State

When `isLoading` is true, the component displays a skeleton UI that includes:
- Placeholder for section title
- Two cards with:
  - Placeholder for card headers
  - Placeholder for "View all" links
  - 5 placeholder items in each card
  - Placeholder for trend indicators and scores

The skeleton UI maintains the same layout and spacing as the loaded content, providing a smooth transition when data becomes available.

## Trending Topics

- Displays top 5 trending topics
- Each topic shows:
  - Topic title
  - Trend score in a badge
  - Trend direction indicator (up/down/stable)
- Links to topic-specific search page
- "View all" link to trending page

## Trending Content

- Displays top 5 trending content items
- Each item shows:
  - Content title
  - Content type badge
  - Trend score in a badge
  - Trend direction indicator (up/down/stable)
- Links to individual content pages
- "View all" link to trending page

## Trend Indicators

Color-coded arrows indicate trend direction:
- Green up arrow: Significant increase (>10)
- Red down arrow: Significant decrease (<-10)
- Yellow sideways arrow: Stable (-10 to 10)

## Styling

- Uses Tailwind CSS for styling
- Card-based layout with hover effects
- Consistent with the application's design system
- Uses shadcn/ui components for UI elements

## Testing

The component includes comprehensive tests that cover:
- Rendering of all main elements
- Loading state display
- Correct number of trending items
- Trend indicator display
- Link functionality 