# DraggableContentCard

A draggable card component for displaying folder items with drag-and-drop functionality.

## Usage

```tsx
import { DraggableContentCard } from "@/components/features/folders";
import type { BookmarkedItem } from "@/lib/types/folder";

const item: BookmarkedItem = {
  id: "item-1",
  contentId: "content-1",
  contentType: "paper",
  title: "My Paper",
  addedAt: new Date(),
  note: "Important research",
};

function MyComponent() {
  const handleRemove = (itemId: string) => {
    // Handle item removal
  };

  return <DraggableContentCard item={item} onRemove={handleRemove} />;
}
```

## Props

| Name     | Type                       | Description                    |
| -------- | -------------------------- | ------------------------------ |
| item     | `BookmarkedItem`           | The bookmarked item to display |
| onRemove | `(itemId: string) => void` | Callback when item is removed  |

## Features

- Drag handle for reordering
- Item metadata display
- Optional note display
- Dropdown menu for actions
- Accessible drag and drop interface
- Loading and hover states

## Drag and Drop Integration

Uses `@dnd-kit/sortable` for drag functionality:

```typescript
const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
  useSortable({ id: item.id });
```

## Testing

Tests are located in `__tests__/DraggableContentCard.test.tsx` and cover:

- Content rendering
- Drag handle presence
- Action menu functionality
- Item removal
- Note display
- Accessibility requirements

## Styling

Uses Tailwind CSS for styling with:

- Hover effects
- Transition animations
- Responsive layout
- Dark mode support

## Related Components

- FolderContentsView - Parent component that manages draggable items
- ShareFolderDialog - Dialog for sharing folder contents
