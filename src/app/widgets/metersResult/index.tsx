
import {useLayoutEffect} from 'react';
import {observer} from 'mobx-react';

import {H2} from "../../shared/ui/typography";
import {MeterTable} from "../../components/meter/table";
import {PopupRemoveMeter} from "../../components/meter/removePopup";

import {useStore} from "../../stores";

export const MetersResult = observer(() => {
    const store = useStore();

    useLayoutEffect(() => {
        store.meterStore.fetchMeters();
    }, [store.meterStore]);

    return (
        <>
            <H2>Список счётчиков</H2>
            <MeterTable/>
            <PopupRemoveMeter/>
        </>
    );
});

