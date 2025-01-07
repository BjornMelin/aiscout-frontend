import { Author, Source, Metrics, Tag, ContentType } from '@/lib/types/shared';

export interface BookmarkedItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  authors: Author[];
  source: Source;
  date: string;
  metrics?: Metrics;
  tags: Tag[];
  addedAt: string;
  folderId?: string;
  note?: string;
}

export interface BookmarkFolder {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  updatedAt: string;
}
