# CuratedContentSection Component

The CuratedContentSection component displays curated content organized by type (papers, repositories, articles, and discussions) in a tabbed interface.

## Features

- Tabbed interface for different content types
- Responsive grid layout
- Loading states with skeletons
- Error handling with retry functionality
- Automatic content fetching

## Usage

```tsx
import { CuratedContentSection } from "@/components/features/home/CuratedContentSection/CuratedContentSection";

export default function HomePage() {
  return (
    <div className="container">
      <CuratedContentSection />
    </div>
  );
}
```

## Technical Details

- Uses Zustand for state management
- Integrates with the content API
- Implements loading and error states
- Uses CSS Grid for responsive layouts
- Implements content type tabs using Radix UI

## States

1. **Loading**: Shows skeleton UI while content is being fetched
2. **Error**: Displays error message with retry option
3. **Success**: Renders content in a tabbed grid layout

## Accessibility

- ARIA roles for tabs and tab panels
- Keyboard navigation for tabs
- Loading states announced to screen readers
- Error messages properly conveyed to assistive technology

## Dependencies

- @/lib/store/home
- @/components/ui/tabs
- @/components/features/content/ContentCard
