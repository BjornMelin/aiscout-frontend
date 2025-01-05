# Folder Management API

## Overview

The folder management API provides endpoints for managing folders and their contents.

## API Reference

### Folders

#### Get Folders

```typescript
GET /folders
Response: Folder[]

// Example
const folders = await getFolders();
```

#### Get Folder by ID

```typescript
GET /folders/:folderId
Response: Folder

// Example
const folder = await getFolderById(folderId);
```

#### Create Folder

```typescript
POST /folders
Body: { name: string; description?: string }
Response: Folder

// Example
const folder = await createFolder({ name: "My Folder" });
```

#### Update Folder

```typescript
PATCH /folders/:folderId
Body: { name?: string; description?: string }
Response: Folder

// Example
const folder = await updateFolder(folderId, { name: "New Name" });
```

#### Delete Folder

```typescript
DELETE /folders/:folderId
Response: void

// Example
await deleteFolder(folderId);
```

### Folder Contents

#### Get Contents

```typescript
GET /folders/:folderId/contents
Response: BookmarkedItem[]

// Example
const items = await getFolderContents(folderId);
```

#### Reorder Contents

```typescript
PATCH /folders/:folderId/reorder
Body: { orderedIds: string[] }
Response: void

// Example
await reorderFolderContents(folderId, orderedIds);
```

#### Remove Item

```typescript
DELETE /folders/:folderId/items/:itemId
Response: void

// Example
await removeFromFolder(folderId, itemId);
```

### Sharing

#### Update Share Settings

```typescript
POST /folders/:folderId/share
Body: {
  isPublic: boolean;
  allowEdits: boolean;
  users?: string[];
}
Response: ShareSettings

// Example
const settings = await shareFolder(folderId, {
  isPublic: true,
  allowEdits: false
});
```

## Types

### Folder

```typescript
interface Folder {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  items: BookmarkedItem[];
  isShared: boolean;
  shareSettings?: ShareSettings;
}
```

### BookmarkedItem

```typescript
interface BookmarkedItem {
  id: string;
  contentId: string;
  contentType: "paper" | "repo" | "article" | "discussion";
  title: string;
  addedAt: Date;
  folderId?: string;
  note?: string;
}
```

### ShareSettings

```typescript
interface ShareSettings {
  id: string;
  folderId: string;
  isPublic: boolean;
  allowEdits: boolean;
  sharedWith: SharedUser[];
  shareToken?: string;
}
```

## Error Handling

All API calls may throw errors with the following structure:

```typescript
interface APIError {
  message: string;
  status?: number;
  code?: string;
}
```

Common error scenarios:

- 404: Resource not found
- 403: Permission denied
- 400: Invalid request data
- 500: Server error

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per hour per user

## Best Practices

1. Always handle API errors
2. Use proper typing for request/response data
3. Implement retry logic for network failures
4. Cache responses when appropriate
5. Use optimistic updates for better UX
