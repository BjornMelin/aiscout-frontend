import { BookmarkedItem } from "@/lib/types/bookmarks";
import { ShareSettings } from "@/lib/types/sharing";

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
