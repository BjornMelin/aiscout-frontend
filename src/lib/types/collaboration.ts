import { ContentType } from "@/lib/types/shared";
import { AuthUser } from "@/lib/types/userAuth";

export type CollaborationRole = "viewer" | "editor" | "admin";
export type CollaborationStatus = "pending" | "active" | "declined";

export interface Collaborator {
  id: string;
  user: AuthUser;
  role: CollaborationRole;
  addedAt: string;
}

export interface CollaborationInvite {
  id: string;
  email: string;
  role: CollaborationRole;
  contentId?: string;
  contentTitle?: string;
  contentType?: ContentType;
  inviterId?: string;
  inviterName?: string;
  invitedBy?: AuthUser;
  createdAt: string;
  expiresAt: string;
  status: CollaborationStatus;
}

export interface CollaborationSettings {
  allowPublicSharing: boolean;
  allowLinkSharing: boolean;
  defaultRole: CollaborationRole;
  requireApproval: boolean;
}
