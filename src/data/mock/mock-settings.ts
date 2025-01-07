import { UserPreferences } from '@/lib/types/settings';

export const mockUserPreferences: UserPreferences = {
  notifications: {
    emailNotifications: true,
    contentUpdates: true,
    newCollaborators: true,
    mentions: true,
    weeklyDigest: false,
  },
  display: {
    defaultView: 'grid',
    contentDensity: 'comfortable',
    codeBlockTheme: 'github',
    showThumbnails: true,
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: false,
    showActivity: true,
    allowMessaging: true,
  },
  defaultLanguage: 'en',
  timezone: 'America/Los_Angeles',
}; 