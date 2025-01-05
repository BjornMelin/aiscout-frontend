# FolderCard

A card component for displaying individual folder information with sharing and deletion capabilities.

> For comprehensive documentation, see [/docs/components/folders.md](/docs/components/folders.md)

## Usage

```tsx
import { FolderCard } from "@/components/features/folders";
import type { Folder } from "@/lib/types/folder";

function MyComponent() {
  const folder: Folder = {
    id: "folder-1",
    name: "My Folder",
    // ...other properties
  };

  const handleShare = () => {
    // Handle sharing
  };

  const handleDelete = () => {
    // Handle deletion
  };

  return (
    <FolderCard folder={folder} onShare={handleShare} onDelete={handleDelete} />
  );
}
```

## Props

| Name     | Type         | Description           |
| -------- | ------------ | --------------------- |
| folder   | `Folder`     | The folder to display |
| onShare  | `() => void` | Share handler         |
| onDelete | `() => void` | Delete handler        |

## Features

- Folder metadata display
- Share button
- Context menu actions
- Click to navigate
- Shared status indicator
- Item count display

## Testing

Tests in `__tests__/FolderCard.test.tsx` cover:

- Rendering
- Share functionality
- Delete functionality
- Navigation
- Event handling
- Optional fields

## Related Components

- FolderGrid - Parent grid component
- ShareFolderDialog - Share settings
- CreateFolderDialog - Folder creation
