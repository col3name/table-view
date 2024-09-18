import {observer} from 'mobx-react-lite';

import {
    Cell,
    Table,
    TableBottomActions,
    TableContainer,
} from '../../../shared/ui/table/ui';
import {MeterTableNavigation} from './meterTableNavigation';
import {MeterRow} from './meterRow';
import {TableBody} from '../../../shared/ui/table/tableBody';
import {TableHeader} from '../../../shared/ui/table/tableHeader';
import {HeaderItem} from '../../../shared/ui/table/table.types';

import {useStore} from '../../../stores';
import React from "react";

const headers: HeaderItem[] = [
    {percent: 2, label: '№'},
    {percent: 4, label: 'Тип'},
    {percent: 8, label: 'Дата установки'},
    {percent: 8, label: 'Автоматический'},
    {percent: 10, label: 'Текущине показания'},
    {percent: 30, label: 'Адрес'},
    {percent: 8, label: 'Примечание'},
    {percent: 8, label: ''},
];

const headerSizes = headers.map((it: HeaderItem) => it.percent);

const OutsideWarn = observer(() => {
    const store = useStore();

    const isOutsidePage = store.meterStore.isOutsidePage;
    if (!isOutsidePage) {
        return null;
    }
    return (<span>Page outside range</span>);
});

const MeterRows = observer(() => {
    const store = useStore();
    const meters = store.meterStore.meterList;

    return (
        meters.map((meter) => {
            return (
                <MeterRow
                    key={meter.id}
                    headerSizes={headerSizes}
                    meter={meter}
                >
                    <Cell $percent={headerSizes[0]}>{meter.place}</Cell>
                </MeterRow>
            );
        })
    )
})

export const MeterTable = observer(() => {
    const store = useStore();

    const loading = store.meterStore.meterLoading;
    const isFetchingNextPage = store.meterStore.isFetchingNextPage;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHeader headers={headers}/>
                    <TableBody isFetchingNextPage={isFetchingNextPage} loading={loading}>
                        <OutsideWarn/>
                        <MeterRows/>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableBottomActions>
                <MeterTableNavigation/>
            </TableBottomActions>
        </>
    );
});
