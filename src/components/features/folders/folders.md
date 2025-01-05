# Folder Management Components

> For comprehensive documentation, see [/docs/components/folders.md](/docs/components/folders.md)

## Quick Start

```tsx
import {
  FolderGrid,
  FolderCard,
  FolderContentsView,
  CreateFolderDialog,
  ShareFolderButton,
  ShareFolderDialog,
  DraggableContentCard,
} from "@/components/features/folders";

// Example usage
function FolderPage() {
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  return (
    <div>
      <FolderGrid />
      <CreateFolderDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
```

## Components

### Grid & Cards

- `FolderGrid` - Main grid layout for folders
- `FolderCard` - Individual folder display card
- `DraggableContentCard` - Draggable content items

### Folder Management

- `FolderContentsView` - Folder contents with drag-and-drop
- `CreateFolderDialog` - New folder creation dialog
- `ShareFolderButton` - Trigger for sharing dialog
- `ShareFolderDialog` - Sharing settings configuration

## Testing

Tests are located in `__tests__` directories. Run with:

```bash
npm test
```

## State Management

Uses Zustand stores:

- `useFoldersStore` - Folder CRUD operations
- `useFolderContentsStore` - Content management

## Related Documentation

- [Feature Documentation](/docs/features/folders.md)
- [API Documentation](/docs/api/folders.md)
- [Component Library](/docs/components/folders.md)
