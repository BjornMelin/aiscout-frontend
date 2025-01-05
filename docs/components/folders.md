# Folder Management Components

## Component Library

### ShareFolderButton

A button component that opens a dialog for sharing folder settings.

```tsx
import { ShareFolderButton } from "@/components/features/folders";

function MyComponent() {
  return <ShareFolderButton folder={folder} />;
}
```

#### Props

| Name   | Type     | Description                                   |
| ------ | -------- | --------------------------------------------- |
| folder | `Folder` | The folder object containing sharing settings |

### ShareFolderDialog

A dialog component for configuring folder sharing settings.

```tsx
import { ShareFolderDialog } from "@/components/features/folders";

function MyComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ShareFolderDialog folder={folder} open={isOpen} onOpenChange={setIsOpen} />
  );
}
```

#### Props

| Name         | Type                      | Description               |
| ------------ | ------------------------- | ------------------------- |
| folder       | `Folder`                  | The folder object         |
| open         | `boolean`                 | Dialog open state         |
| onOpenChange | `(open: boolean) => void` | Open state change handler |

### FolderContentsView

Displays and manages folder contents with drag-and-drop functionality.

```tsx
import { FolderContentsView } from "@/components/features/folders";

function MyComponent() {
  return <FolderContentsView folder={folder} />;
}
```

#### Props

| Name   | Type     | Description                        |
| ------ | -------- | ---------------------------------- |
| folder | `Folder` | The folder object containing items |

### DraggableContentCard

A draggable card component for folder items.

```tsx
import { DraggableContentCard } from "@/components/features/folders";

function MyComponent() {
  const handleRemove = (itemId: string) => {
    // Handle removal
  };

  return <DraggableContentCard item={item} onRemove={handleRemove} />;
}
```

#### Props

| Name     | Type                       | Description         |
| -------- | -------------------------- | ------------------- |
| item     | `BookmarkedItem`           | The item to display |
| onRemove | `(itemId: string) => void` | Removal handler     |

## Component Architecture

### State Management

- Components use Zustand for state management
- State is shared between components through stores
- Components handle their own loading states

### Accessibility

- All components are keyboard accessible
- ARIA labels and roles are properly set
- Focus management follows best practices

### Error Handling

- Components handle API errors gracefully
- Error states are displayed to users
- Retry mechanisms are provided

### Testing

- Each component has comprehensive tests
- Tests cover all major functionality
- Accessibility tests included

## Usage Guidelines

### When to Use Each Component

- **ShareFolderButton**: Use when you need a simple trigger for sharing
- **ShareFolderDialog**: Use for complex sharing configuration
- **FolderContentsView**: Use to display folder contents with drag-and-drop
- **DraggableContentCard**: Use within FolderContentsView for items

### Best Practices

1. Always provide proper types for props
2. Handle loading and error states
3. Implement proper accessibility features
4. Test all user interactions
5. Document any custom behaviors

### Common Patterns

```tsx
// Example of common component composition
function FolderPage({ folderId }: { folderId: string }) {
  const folder = useFolder(folderId);

  return (
    <div>
      <div className="flex justify-between">
        <h1>{folder.name}</h1>
        <ShareFolderButton folder={folder} />
      </div>
      <FolderContentsView folder={folder} />
    </div>
  );
}
```
