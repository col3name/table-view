import React from "react";

export type NotificationId = string;

export enum NotificationKind {
    error = 'error',
    info = 'info',
    success = 'success',
    warning = 'warning',
}

export type Notification = {
    id: string;
    kind: NotificationKind;
    message: React.ReactNode;
    closable?: boolean;
    timeout?: number;
}

export interface INotificationProps {
    kind: NotificationKind;
    children: React.ReactNode;
    closable?: boolean
    className?: string;
    onClose?: () => void;
}
