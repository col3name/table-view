import React from 'react';

// import { Notification } from '@ui/Notification';
// import { Notifications } from '@ui/Notifications';

import styles from './Notifier.module.scss';

import {
  NotificationId,
  Notification as TNotification,
} from '../../typings/notifications';
import { Portal } from '../../../components/portal/Portal';
import { Notifications } from '../notifications/Notifications';
import { Notification } from '../notifications/Notification';

interface NotifierProps {
  notifications: TNotification[];
  onClose: (id: NotificationId) => void;
}

export const Notifier: React.FC<NotifierProps> = ({
  notifications,
  onClose,
}) => (
  <Portal id="notifications" className={styles.portal}>
    <Notifications className={styles.notifier}>
      {notifications.map(({ id, message, kind, closable }) => (
        <Notification
          key={id + ':' + message}
          kind={kind}
          closable={closable}
          onClose={() => onClose(id)}
        >
          {message}
        </Notification>
      ))}
    </Notifications>
  </Portal>
);
