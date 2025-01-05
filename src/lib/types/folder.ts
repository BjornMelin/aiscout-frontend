export interface Folder {
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

export interface BookmarkedItem {
  id: string;
  contentId: string;
  contentType: "paper" | "repo" | "article" | "discussion";
  addedAt: Date;
  folderId?: string;
  note?: string;
}

export interface ShareSettings {
  id: string;
  folderId: string;
  isPublic: boolean;
  allowEdits: boolean;
  sharedWith: SharedUser[];
  shareToken?: string;
}

export interface SharedUser {
  id: string;
  email: string;
  permissions: "view" | "edit";
  addedAt: Date;
}
