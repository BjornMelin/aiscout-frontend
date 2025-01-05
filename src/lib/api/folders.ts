import type { Folder, BookmarkedItem, ShareSettings } from "@/lib/types/folder";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message ||
        `API Error: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export async function getFolders(): Promise<Folder[]> {
  const response = await fetch(`${API_BASE_URL}/folders`, {
    credentials: "include",
  });

  return handleResponse<Folder[]>(response);
}

export async function getFolderById(folderId: string): Promise<Folder> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
    credentials: "include",
  });

  return handleResponse<Folder>(response);
}

export async function getFolderContents(
  folderId: string
): Promise<BookmarkedItem[]> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}/contents`, {
    credentials: "include",
  });

  return handleResponse<BookmarkedItem[]>(response);
}

export async function reorderFolderContents(
  folderId: string,
  orderedIds: string[]
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}/reorder`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderedIds }),
  });

  await handleResponse<void>(response);
}

export async function removeFromFolder(
  folderId: string,
  itemId: string
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/folders/${folderId}/items/${itemId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  await handleResponse<void>(response);
}

export async function createFolder(data: {
  name: string;
  description?: string;
}): Promise<Folder> {
  const response = await fetch(`${API_BASE_URL}/folders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Folder>(response);
}

export async function updateFolder(
  folderId: string,
  data: { name?: string; description?: string }
): Promise<Folder> {
  if (!folderId) {
    throw new Error("Folder ID is required");
  }

  const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Folder>(response);
}

export async function deleteFolder(folderId: string): Promise<void> {
  if (!folderId) {
    throw new Error("Folder ID is required");
  }

  const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse<void>(response);
}

export async function addBookmark(
  contentId: string,
  data: { folderId?: string; note?: string }
): Promise<BookmarkedItem> {
  if (!contentId) {
    throw new Error("Content ID is required");
  }

  const response = await fetch(`${API_BASE_URL}/bookmarks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contentId,
      ...data,
    }),
  });

  return handleResponse<BookmarkedItem>(response);
}

export async function shareFolder(
  folderId: string,
  data: { isPublic: boolean; allowEdits: boolean; users?: string[] }
): Promise<ShareSettings> {
  if (!folderId) {
    throw new Error("Folder ID is required");
  }

  const response = await fetch(`${API_BASE_URL}/folders/${folderId}/share`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<ShareSettings>(response);
}
