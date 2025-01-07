import { Collaborator, CollaborationInvite, CollaborationSettings } from '@/lib/types/collaboration';

export const mockCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    addedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'editor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    addedAt: '2024-01-02T15:30:00Z',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'viewer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    addedAt: '2024-01-03T09:45:00Z',
  },
];

export const mockInvites: CollaborationInvite[] = [
  {
    id: '1',
    email: 'alice.brown@example.com',
    role: 'editor',
    invitedBy: {
      id: '1',
      name: 'John Doe',
    },
    createdAt: '2024-01-04T11:20:00Z',
    expiresAt: '2024-01-11T11:20:00Z',
    status: 'pending',
  },
  {
    id: '2',
    email: 'charlie.davis@example.com',
    role: 'viewer',
    invitedBy: {
      id: '1',
      name: 'John Doe',
    },
    createdAt: '2024-01-03T16:45:00Z',
    expiresAt: '2024-01-10T16:45:00Z',
    status: 'active',
  },
];

export const mockSettings: CollaborationSettings = {
  allowPublicSharing: false,
  allowLinkSharing: true,
  defaultRole: 'viewer',
  requireApproval: true,
}; 