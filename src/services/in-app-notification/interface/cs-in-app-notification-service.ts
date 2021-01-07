import { Observable } from 'rxjs';
import { CsInAppNotificationServiceConfig } from '../../../cs-module';
import { InAppNotification } from '../../../models';

export interface CsInAppNotificationService {

  updateNotification(uid: string, id: string, notification: InAppNotification, config?: CsInAppNotificationServiceConfig): Observable<void>;

  getAllNotifications(uid: string, config?: CsInAppNotificationServiceConfig): Observable<InAppNotification[]>;

  deleteNotification(uid: string, id: string, config?: CsInAppNotificationServiceConfig): Observable<void>;

}