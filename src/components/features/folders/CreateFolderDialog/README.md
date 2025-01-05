# CreateFolderDialog

A dialog component for creating new folders with name and description.

> For comprehensive documentation, see [/docs/components/folders.md](/docs/components/folders.md)

## Usage

```tsx
import { CreateFolderDialog } from "@/components/features/folders";

function MyComponent() {
  const [isOpen, setIsOpen] = React.useState(false);

  return <CreateFolderDialog open={isOpen} onOpenChange={setIsOpen} />;
}
```

## Props

| Name         | Type                      | Description        |
| ------------ | ------------------------- | ------------------ |
| open         | `boolean`                 | Dialog open state  |
| onOpenChange | `(open: boolean) => void` | Open state handler |

## Features

- Form validation
- Loading states
- Error handling
- Toast notifications
- Keyboard navigation
- Focus management

## Form Fields

### Required

- Name: Folder name (1-50 characters)

### Optional

- Description: Folder description (0-200 characters)

## State Management

Uses `useFoldersStore` for:

- Creating folders
- Error handling
- Loading states

## Testing

Tests in `__tests__/CreateFolderDialog.test.tsx` cover:

- Form rendering
- Validation
- Submission
- Error handling
- Loading states
- Dialog closing

## Related Components

- FolderGrid - Parent grid component
- FolderCard - Folder display
- ShareFolderDialog - Share settings
