import { ShareLink, SharedContent, SharePermission } from '@/lib/types/sharing';

export const mockShareLinks: ShareLink[] = [
  {
    id: 'sl-1',
    contentId: 'article-1',
    contentType: 'article',
    permission: 'view',
    createdAt: '2024-01-15T10:00:00Z',
    expiresAt: '2024-02-15T10:00:00Z',
    accessCount: 12,
    isActive: true,
  },
  {
    id: 'sl-2',
    contentId: 'repository-1',
    contentType: 'repository',
    permission: 'edit',
    createdAt: '2024-01-10T08:00:00Z',
    expiresAt: null,
    accessCount: 5,
    isActive: true,
  },
  {
    id: 'sl-3',
    contentId: 'discussion-1',
    contentType: 'discussion',
    permission: 'comment',
    createdAt: '2024-01-05T14:00:00Z',
    expiresAt: '2024-01-19T14:00:00Z',
    accessCount: 8,
    isActive: false,
  },
];

export const mockSharedContent: SharedContent[] = [
  {
    id: 'article-1',
    title: 'Introduction to Machine Learning',
    type: 'article',
    sharedBy: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    sharedWith: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    permission: 'view',
    sharedAt: '2024-01-15T10:00:00Z',
    lastAccessed: '2024-01-16T15:30:00Z',
  },
  {
    id: 'repository-1',
    title: 'AI Research Repository',
    type: 'repository',
    sharedBy: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    sharedWith: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    permission: 'edit',
    sharedAt: '2024-01-10T08:00:00Z',
    lastAccessed: null,
  },
];

export const generateShareLink = (
  contentId: string,
  contentType: ShareLink['contentType'],
  permission: SharePermission,
  expiresAt: string | null
): ShareLink => {
  return {
    id: `sl-${Date.now()}`,
    contentId,
    contentType,
    permission,
    createdAt: new Date().toISOString(),
    expiresAt,
    accessCount: 0,
    isActive: true,
  };
};

export const deactivateShareLink = (linkId: string): void => {
  const link = mockShareLinks.find((l) => l.id === linkId);
  if (link) {
    link.isActive = false;
  }
};