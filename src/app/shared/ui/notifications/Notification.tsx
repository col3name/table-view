import cn from "classnames";
import React from "react";

// import { Button } from '@ui/Button';
// import { Icon24Close as CloseIcon } from '@ui/Icon';

import styles from "./notification.module.css";
import {
  INotificationProps,
  NotificationKind,
} from "../../typings/notifications";
import { Button } from "../button";
import { CloseIcon } from "../../icons/CloseIcon";

const getNotificationClassName = ({
  kind,
  className,
}: Partial<INotificationProps>) =>
  cn(
    styles.notification,
    {
      [styles.kindError]: kind === NotificationKind.error,
      [styles.kindInfo]: kind === NotificationKind.info,
      [styles.kindSuccess]: kind === NotificationKind.success,
      [styles.kindWarning]: kind === NotificationKind.warning,
    },
    className,
    "notification-toast",
  );

export const Notification: React.FC<INotificationProps> = ({
  kind = NotificationKind.info,
  children,
  className,
  onClose,
}) => {
  return (
    <div className={getNotificationClassName({ kind, className })}>
      <p className={styles.content}>{children}</p>
      {onClose && (
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      )}
    </div>
  );
};
