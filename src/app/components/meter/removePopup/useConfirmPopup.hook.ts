import {useCallback} from "react";

import {useStore} from "../../../stores";
import {useNotifications} from "../../../services/notifications";

export const useConfirmPopup = () => {
    const store = useStore().meterStore;
    const opened = store.confirmDeletePopup.opened;
    const { pushSuccess, pushError } = useNotifications();

    const close = useCallback(() => {
        store.closeRemoveConfirmPopup()
    }, [store])

    const confirm = useCallback(async () => {
        const isLoading = store.deleteLoading;
        if (isLoading) {
            return;
        }

        const result = await store.confirmTheRemoveFromCart()

        if (!result.isOk) {
            pushError('Не удалось удалить');
           return;
        }
        pushSuccess('Успешно удалено');
        close();
    }, [close, pushError, pushSuccess, store])

    return {
        opened,
        close,
        confirm,
    };
};
