# CuratedSection Component

A component for displaying a grid of curated content items with type-specific metrics and a "View More" button.

## Features

- Responsive grid layout (1 column on mobile, 2 columns on desktop)
- Content type-specific metrics display
- Tag and author display
- "View More" navigation button

## Props

| Prop  | Type                                                   | Required | Description                       |
| ----- | ------------------------------------------------------ | -------- | --------------------------------- |
| items | `ContentItem[]`                                        | Yes      | Array of content items to display |
| type  | `"paper" \| "repository" \| "article" \| "discussion"` | Yes      | Type of content being displayed   |

## Usage

```tsx
import { CuratedSection } from "@/components/features/home/CuratedSection/CuratedSection";

<CuratedSection items={contentItems} type="paper" />;
```

## Content Item Display

Each content item is displayed in a card that shows:

- Content type badge
- Publication date
- Title
- Description (truncated to 5 lines)
- Tags
- Authors with avatars
- Type-specific metrics:
  - Papers: Citation count
  - Repositories: Stars and forks
  - Articles: View count

## Grid Layout

- Mobile: Single column
- Desktop: Two columns
- Responsive spacing and gaps
- Hover effects on cards

## Notes

- The component is client-side rendered ("use client")
- Uses Next.js Link component for navigation
- Includes data-testid for testing
- Supports all content types defined in the ContentItem type
- Automatically capitalizes content type in the "View More" button
- Uses the shadcn/ui component library for UI elements
- Designed to be used within CuratedContent for tabbed navigation
