export enum InAppNotificationType {
  USER_FEED = 0,
  ACTIONABLE_NOTIFICATION = 1,
  NOTIFY = 2,
  CONFIG = 3
}

export enum InAppNotificationReadType {
  TRUE = 1,
  FALSE = 0
}

export interface InAppNotification {
  id: string;
  type: InAppNotificationType;
  displayTime: number;
  expiry: number;
  isRead: InAppNotificationReadType;
  actionData: ActionData;
}

export interface ActionData {
  actionType: string;
  title: string;
  identifier?: string;
  ctaText?: string;
  deepLink?: string;
  thumbnail?: string;
  banner?: string;
  deploymentKey?: string;
  description?: string;
}

export enum InAppNotificationStatus {
  READ = 'read',
  UNREAD = 'unread',
  ALL = 'all'
}
