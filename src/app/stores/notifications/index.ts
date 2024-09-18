import { Instance, types } from 'mobx-state-tree';

import {
  Notification,
  NotificationId,
  NotificationKind,
} from '../../shared/typings/notifications';

import { SomePartial } from '../../shared/typings/utils';
import { randomID } from '../../shared/lib/common';

const MAX_VISIBLE_NOTIFICATIONS = 3;

const NotifyKind = types.frozen(NotificationKind);
const MNotification = types.model({
  id: types.string,
  kind: NotifyKind,
  message: types.string,
  closable: types.optional(types.boolean, true),
  timeout: types.optional(types.number, 0),
});

export type MNotificationModel = Instance<typeof MNotification>;
export type NotifyKindModel = Instance<typeof NotifyKind>;

const toNotificationKind = (kind: NotifyKindModel): NotificationKind => {
  if (kind.success) {
    return NotificationKind.success;
  }
  if (kind.error) {
    return NotificationKind.error;
  }
  if (kind.info) {
    return NotificationKind.info;
  }
  if (kind.warning) {
    return NotificationKind.warning;
  }
  return NotificationKind.info;
};
export const NotificationStore = types
  .model({
    notifications: types.optional(types.array(MNotification), []),
  })
  .views((self) => ({
    get notificationsList(): Notification[] {
      return self.notifications.map(
        (item: MNotificationModel): Notification => ({
          id: item.id,
          message: item.message,
          closable: item.closable,
          timeout: item.timeout,
          kind: toNotificationKind(item.kind),
        })
      );
    },
  }))
  .actions((self) => ({
    push: (
      notification: SomePartial<
        Omit<Notification, 'id'>,
        'timeout' | 'closable'
      >
    ) => {
      const fullNotification = {
        timeout: 4000,
        ...notification,
        id: randomID(),
      };

      if (self.notifications.length === MAX_VISIBLE_NOTIFICATIONS) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        self.remove(self.notifications[0].id);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      self.notifications.push(fullNotification);

      if (fullNotification.timeout > 0) {
        const timeoutId = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          self.remove(fullNotification.id);
          clearTimeout(timeoutId);
        }, fullNotification.timeout);
      }
    },
    pushSuccess: (
      message: string,
      options?: Partial<Omit<Notification, 'id' | 'message'>>
    ) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return self.push({
        kind: NotificationKind.success,
        message,
        ...(options || {}),
      });
    },
    pushError: (
      message: string,
      options?: Partial<Omit<Notification, 'id' | 'message'>>
    ) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return self.push({
        kind: NotificationKind.error,
        message,
        ...(options || {}),
      });
    },
    remove: (id: NotificationId) => {
      const index = self.notifications.findIndex(
        (notification) => notification.id === id
      );

      if (index !== -1) {
        self.notifications.splice(index, 1);
      }
    },
  }));
