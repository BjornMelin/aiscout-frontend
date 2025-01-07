# CuratedContent Component

A tabbed interface component that displays curated content organized by type (papers, repositories, articles, and discussions).

## Features

- Tabbed navigation for different content types
- Responsive layout
- Filters featured content only
- Limits to 2 items per content type
- Uses CuratedSection for content display

## Usage

```tsx
import { CuratedContent } from "@/components/features/home/CuratedContent/CuratedContent";

// Basic usage
<CuratedContent />;
```

## Component Structure

The component is organized as follows:

1. Tabs Container

   - Papers tab
   - Repositories tab
   - Articles tab
   - Discussions tab

2. Tab Content
   - Each tab uses CuratedSection to display content
   - Content is filtered by type and featured status
   - Limited to 2 items per section

## Content Filtering

Content is filtered using the following criteria:

- Matches the selected content type
- Has `featured: true`
- Limited to first 2 items per type

Example:

```tsx
const getCuratedContent = (type: ContentItem["type"]) => {
  return mockContent
    .filter((content) => content.type === type && content.featured)
    .slice(0, 2);
};
```

## Tab Configuration

| Tab Label   | Content Type | Description                          |
| ----------- | ------------ | ------------------------------------ |
| Papers      | paper        | Research papers and academic content |
| Repos       | repository   | Code repositories and projects       |
| Articles    | article      | Blog posts and articles              |
| Discussions | discussion   | Community discussions and forums     |

## Dependencies

- Uses shadcn/ui Tabs component
- Requires CuratedSection component
- Uses mock content data (can be replaced with real data source)

## Notes

- Client-side rendered ("use client")
- Default tab is set to "paper"
- Each tab maintains its own state
- Content is re-filtered when tabs are switched
- Uses the same styling and layout as CuratedSection
- Integrates with the overall home page layout
