import {injectable} from 'inversify';
import {Observable} from 'rxjs';
import {CsUserService} from '../../../services/user/interface';
import {CsInAppNotificationServiceConfig} from '../../../cs-module';
import {InAppNotification, InAppNotificationReadType, UserFeedCategory, UserFeedStatus} from '../../../models';
import {CsInAppNotificationService} from '../interface';
import {map} from 'rxjs/operators';

@injectable()
class InAppNotificationServiceImpl implements CsInAppNotificationService {
  constructor(private csUserService: CsUserService){}
  getAllNotifications(uid: string, config?: CsInAppNotificationServiceConfig): Observable<InAppNotification[]> {
    return this.csUserService.getUserFeed<UserFeedCategory.NOTIFICATION>(uid).pipe(
      map(feedEntries => {
        return feedEntries.map(e => {
          return {
            ...e.data,
            id: e.identifier,
            displayTime: new Date(e.createdOn).getTime(),
            expiry: e.expireOn ? new Date(e.expireOn).getTime() : 0,
            isRead: (e.status === UserFeedStatus.READ) ? InAppNotificationReadType.TRUE : InAppNotificationReadType.FALSE
          };
        });
      })
    );
  }

  updateNotification(uid: string, id: string, notification: InAppNotification, config?: CsInAppNotificationServiceConfig): Observable<void> {
    const notificationReadStatus: UserFeedStatus =
      notification.isRead === InAppNotificationReadType.TRUE ? UserFeedStatus.READ : UserFeedStatus.UNREAD;
    this.csUserService.updateUserFeedEntry(uid, id, UserFeedCategory.NOTIFICATION, { status: notificationReadStatus }, config);
  }

  deleteNotification(uid: string, id: string, config?: CsInAppNotificationServiceConfig): Observable<void> {
    this.csUserService.deleteUserFeedEntry(uid, id, UserFeedCategory.NOTIFICATION, config);
  }

}