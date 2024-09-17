import {useCallback} from "react";

import {useStore} from "../../../stores";

export const useConfirmPopup = () => {
    const store = useStore().meterStore;
    const opened = store.confirmDeletePopup.opened;

    const close = useCallback(() => {
        store.closeRemoveConfirmPopup()
    }, [store])

    const confirm = useCallback(async () => {
        const isLoading = store.deleteLoading;
        if (isLoading) {
            return;
        }

        const result = await store.confirmTheRemoveFromCart()

        if (result.isOk) {
            close();
        }
    }, [close, store])

    return {
        opened,
        close,
        confirm,
    };
};
