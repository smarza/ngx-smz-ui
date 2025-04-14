export enum NotificationFolder {
  INBOX,
  ARCHIVED
}

// --------
// Não alterar a ordem desde enum pois o mesmo está sincronizado com os modelos da api
export enum NotificationStatus {
  NEW,
  NOTIFIED,
  VIEWED,
  ARCHIVED
}

// --------
// Não alterar a ordem desde enum pois o mesmo está sincronizado com os modelos da api
export enum NotificationType {
  SUCCESS,
  INFO,
  WARNING,
  DANGER,
  HELP
}

export const NotificationTypeClass = {
  [NotificationType.SUCCESS]: 'success-type',
  [NotificationType.INFO]: 'info-type',
  [NotificationType.WARNING]: 'warning-type',
  [NotificationType.DANGER]: 'danger-type',
  [NotificationType.HELP]: 'help-type',
};

export const NotificationFolderStatus = {
  [NotificationFolder.INBOX]: [ NotificationStatus.NEW, NotificationStatus.NOTIFIED, NotificationStatus.VIEWED ],
  [NotificationFolder.ARCHIVED]: [ NotificationStatus.ARCHIVED ],
};

export interface NotificationData {
  id: string
  category: string;
  title: string;
  body: string;
  date: Date;
  status: NotificationStatus;
  type: NotificationType;
  link: string;
  route: string;
  searchData: string;
}

export interface NotificationGetRequest {
  category?: string;
  status?: NotificationStatus;
  type?: NotificationType;
}

export interface NotificationUpdateRequest {
  notificationIds?: string[];
  status: NotificationStatus;
}

export interface NotificationDeleteRequest {
  notificationIds?: string[];
}