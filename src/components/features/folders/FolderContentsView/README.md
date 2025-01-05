# FolderContentsView

A component that displays and manages the contents of a folder, including drag-and-drop reordering functionality.

## Usage

```tsx
import { FolderContentsView } from "@/components/features/folders";
import type { Folder } from "@/lib/types/folder";

const folder: Folder = {
  id: "folder-1",
  name: "My Folder",
  // ...other folder properties
};

function MyComponent() {
  return <FolderContentsView folder={folder} />;
}
```

## Props

| Name   | Type     | Description                                   |
| ------ | -------- | --------------------------------------------- |
| folder | `Folder` | The folder object containing items to display |

## Features

- Drag-and-drop content reordering
- Item removal
- Loading states with skeleton UI
- Error handling with retry option
- Empty state messaging
- Accessible drag and drop interface

## State Management

Uses the `useFolderContentsStore` Zustand store for:

```typescript
interface FolderContentsState {
  items: BookmarkedItem[];
  isLoading: boolean;
  error: Error | null;
  fetch: (folderId: string) => Promise<void>;
  reorder: (orderedIds: string[]) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
}
```

## Testing

Tests are located in `__tests__/FolderContentsView.test.tsx` and cover:

- Content rendering
- Loading states
- Error handling
- Empty states
- Item removal
- Content reordering

## Drag and Drop

Uses `@dnd-kit` for drag-and-drop functionality:

- Keyboard accessible
- Touch support
- Animations
- Reordering logic

## Related Components

- DraggableContentCard - Individual content items that can be dragged
- FolderGrid - Parent component that displays folder information
