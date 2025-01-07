# SearchBar Component

A search input component with suggestions support for the AI/ML content discovery platform.

## Features

- Clean, minimal search interface
- Real-time search suggestions
- Debounced search input
- Responsive design
- Keyboard navigation support
- Click-outside handling
- Multiple variants (header/page)

## Props

| Prop            | Type                      | Required | Default                   | Description                           |
| --------------- | ------------------------- | -------- | ------------------------- | ------------------------------------- |
| placeholder     | `string`                  | No       | "Search AI/ML content..." | Placeholder text for the search input |
| showSuggestions | `boolean`                 | No       | `true`                    | Whether to show search suggestions    |
| variant         | `"header" \| "page"`      | No       | `"page"`                  | Visual variant of the search bar      |
| className       | `string`                  | No       | -                         | Additional CSS classes                |
| onSearch        | `(query: string) => void` | No       | -                         | Callback when search is performed     |

## Usage

```tsx
import { SearchBar } from "@/components/features/search/SearchBar/SearchBar";

// Basic usage
<SearchBar />

// With custom placeholder and no suggestions
<SearchBar
  placeholder="Search papers..."
  showSuggestions={false}
/>

// Header variant with custom search handler
<SearchBar
  variant="header"
  onSearch={(query) => console.log(`Searching for: ${query}`)}
/>
```

## Search Suggestions

The component shows suggestions when:

- User has typed at least 2 characters
- `showSuggestions` prop is true
- Suggestions are available from the API
- Input is focused

Suggestions include:

- Search term variations
- Paper suggestions
- Author suggestions
- Repository suggestions

## Styling

- Uses shadcn/ui Input and Button components
- Responsive width based on variant
- Consistent with application design system
- Smooth transitions and hover states
- Accessible focus states

## Keyboard Navigation

- Enter: Submit search
- Escape: Clear input/close suggestions
- Arrow keys: Navigate suggestions (TODO)
- Tab: Navigate through UI elements

## Testing

The component includes tests for:

- Default and custom rendering
- Suggestion display and interaction
- Search submission behavior
- Variant styling
- Custom class application
- Click outside behavior
