import { ContentType } from "@/lib/types/shared";
import { AuthUser } from "@/lib/types/user";

export type SharePermission = "view" | "edit" | "comment";
export type ExportFormat = "pdf" | "bibtex" | "markdown" | "json";

export interface ShareLink {
  id: string;
  contentId: string;
  contentType: ContentType;
  permission: SharePermission;
  createdAt: string;
  expiresAt: string | null;
  accessCount: number;
  isActive: boolean;
}

export interface SharedContent {
  id: string;
  title: string;
  type: ContentType;
  sharedBy: AuthUser;
  sharedWith: AuthUser[];
  permission: SharePermission;
  sharedAt: string;
  lastAccessed: string | null;
}

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata: boolean;
  includeCitations: boolean;
  includeAbstract: boolean;
  includeFullText: boolean;
  citationStyle?: string;
}

export interface SharedUser {
  id: string;
  email: string;
  permissions: SharePermission;
  addedAt: Date;
}

export interface ShareSettings {
  id: string;
  folderId: string;
  isPublic: boolean;
  allowEdits: boolean;
  sharedWith: SharedUser[];
  shareToken?: string;
}
