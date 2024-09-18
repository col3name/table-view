import React from "react";

import { Notifier } from "../Notifier/Notifier";

import { NotificationId, Notification } from "../../typings/notifications";

export type NotificationsProviderProps = React.PropsWithChildren & {
  notifications: Notification[];
  onClose: (id: NotificationId) => void;
};

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
  notifications,
  onClose,
}) => (
  <>
    <Notifier notifications={notifications} onClose={onClose} />
    {children}
  </>
);
