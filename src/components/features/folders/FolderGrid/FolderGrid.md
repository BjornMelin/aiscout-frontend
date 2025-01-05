# FolderGrid

A grid layout component for displaying folders with create, share, and delete functionality.

> For comprehensive documentation, see [/docs/components/folders.md](/docs/components/folders.md)

## Usage

```tsx
import { FolderGrid } from "@/components/features/folders";

function MyComponent() {
  return <FolderGrid />;
}
```

## Features

- Grid layout for folders
- Create folder button
- Loading states
- Error handling
- Empty state
- Responsive design

## State Management

Uses `useFoldersStore` for:

- Fetching folders
- Creating folders
- Deleting folders
- Loading states
- Error handling

## Testing

Tests in `__tests__/FolderGrid.test.tsx` cover:

- Rendering
- Loading states
- Error handling
- Empty states
- Folder creation
- Folder deletion

## Related Components

- FolderCard - Individual folder display
- CreateFolderDialog - New folder creation
- ShareFolderDialog - Folder sharing
