import React from 'react';
import { observer } from 'mobx-react-lite';

import {useStore} from "../../stores";

import { NotificationsProvider as VicugnaNotificationsProvider} from "../../shared/ui/notifications";

interface NotificationsProviderProps {
    children: React.ReactNode;
}

export const NotificationsProvider = observer<NotificationsProviderProps>(
    function NotificationsProvider({ children }) {
        const notificationsStore = useStore().notificationStore;

        return (
            <VicugnaNotificationsProvider
                notifications={[...notificationsStore.notificationsList]}
                onClose={notificationsStore.remove}
            >
                {children}
            </VicugnaNotificationsProvider>
        );
    },
);

export const useNotifications = () => {
    const notificationsStore = useStore().notificationStore;

    return {
        push: notificationsStore.push,
        remove: notificationsStore.remove,
        pushSuccess: notificationsStore.pushSuccess,
        pushError: notificationsStore.pushError,
    };
};
