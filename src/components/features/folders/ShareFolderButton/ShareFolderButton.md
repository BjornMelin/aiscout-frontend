# ShareFolderButton

A button component that opens a dialog for configuring folder sharing settings.

## Usage

```tsx
import { ShareFolderButton } from "@/components/features/folders";
import type { Folder } from "@/lib/types/folder";

const folder: Folder = {
  id: "folder-1",
  name: "My Folder",
  // ...other folder properties
};

function MyComponent() {
  return <ShareFolderButton folder={folder} />;
}
```

## Props

| Name | Type | Description |
|------|------|-------------|
| folder | `Folder` | The folder object containing sharing settings |

## Features

- Opens a dialog for configuring sharing settings
- Displays current sharing status
- Integrates with ShareFolderDialog component
- Accessible button with proper ARIA labels

## Testing

Tests are located in `__tests__/ShareFolderButton.test.tsx` and cover:

- Button rendering
- Dialog opening/closing
- Accessibility requirements

## Related Components

- ShareFolderDialog - The dialog component that opens when the button is clicked 