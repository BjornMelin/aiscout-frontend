# ShareFolderDialog

A dialog component for configuring folder sharing settings, including public access, edit permissions, and user-specific sharing.

## Usage

```tsx
import { ShareFolderDialog } from "@/components/features/folders";
import type { Folder } from "@/lib/types/folder";

const folder: Folder = {
  id: "folder-1",
  name: "My Folder",
  // ...other folder properties
};

function MyComponent() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ShareFolderDialog folder={folder} open={isOpen} onOpenChange={setIsOpen} />
  );
}
```

## Props

| Name         | Type                      | Description                                   |
| ------------ | ------------------------- | --------------------------------------------- |
| folder       | `Folder`                  | The folder object containing sharing settings |
| open         | `boolean`                 | Whether the dialog is open                    |
| onOpenChange | `(open: boolean) => void` | Callback when dialog open state changes       |

## Features

- Configure public/private access
- Set edit permissions
- Share with specific users via email
- Copy shareable link
- Form validation for email addresses
- Loading and error states
- Toast notifications for actions

## State Management

The dialog manages its own form state using `react-hook-form` and updates the backend through the `@/lib/api/folders` module.

## Testing

Tests are located in `__tests__/ShareFolderDialog.test.tsx` and cover:

- Dialog rendering
- Form submission
- Share settings updates
- Error handling
- User input validation

## API Integration

Uses the `shareFolder` function from `@/lib/api/folders` to update sharing settings:

```typescript
interface ShareSettings {
  isPublic: boolean;
  allowEdits: boolean;
  users?: string[];
}

await shareFolder(folderId, settings);
```
