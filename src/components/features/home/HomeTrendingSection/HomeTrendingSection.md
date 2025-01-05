# HomeTrendingSection Component

The HomeTrendingSection component displays a preview of trending topics in AI/ML on the home page, with a link to view the full trending page.

## Features

- Displays top 3 trending topics
- Loading state with skeleton UI
- Error handling with retry functionality
- "View all" navigation to full trending page
- Automatic data fetching

## Usage

```tsx
import { HomeTrendingSection } from "@/components/features/home/HomeTrendingSection/HomeTrendingSection";

export default function HomePage() {
  return (
    <div className="container">
      <HomeTrendingSection />
    </div>
  );
}
```

## Technical Details

- Uses Zustand for state management
- Integrates with trending topics API
- Implements loading and error states
- Uses shadcn/ui Card component
- Responsive design with Tailwind CSS

## States

1. **Loading**: Shows skeleton UI while trending data is being fetched
2. **Error**: Displays error message with retry option
3. **Success**: Shows top 3 trending topics with "View all" button

## Accessibility

- Proper heading hierarchy
- Loading states announced to screen readers
- Error messages properly conveyed
- Interactive elements are keyboard accessible

## Dependencies

- @/lib/store/trending
- @/components/ui/card
- @/components/ui/button
- @/components/features/trending/TrendingTopicCard
