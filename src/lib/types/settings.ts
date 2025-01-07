export interface NotificationSettings {
  emailNotifications: boolean;
  contentUpdates: boolean;
  newCollaborators: boolean;
  mentions: boolean;
  weeklyDigest: boolean;
}

export interface DisplaySettings {
  defaultView: "grid" | "list";
  contentDensity: "comfortable" | "compact";
  codeBlockTheme: "github" | "dracula" | "monokai";
  showThumbnails: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "connections";
  showEmail: boolean;
  showActivity: boolean;
  allowMessaging: boolean;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  display: DisplaySettings;
  privacy: PrivacySettings;
  defaultLanguage: string;
  timezone: string;
}
