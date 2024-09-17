import {observer} from "mobx-react";

import {
    Table,
    TableBottomActions,
    TableContainer
} from "../../../shared/components/table/ui";
import {MeterTableNavigation} from "./meterTableNavigation";
import {MeterRow} from "./MeterRow";
import {TableBody} from "../../../shared/components/table/tableBody";
import {TableHeader} from "../../../shared/components/table/tableHeader";
import {HeaderItem} from "../../../shared/components/table/table.types";

import {useStore} from "../../../stores";

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

export const MeterTable = observer(() => {
    const store = useStore();

    const meters = store.meterStore.meterList;
    const loading = store.meterStore.meterLoading;
    const isFetchingNextPage = store.meterStore.isFetchingNextPage;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHeader headers={headers}/>

                    <TableBody isFetchingNextPage={isFetchingNextPage} loading={loading}>
                        {meters.map((meter) => {
                            return (
                                <MeterRow key={meter.id}
                                          place={meter.place}
                                          headerSizes={headerSizes} meter={meter}/>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableBottomActions>
                <MeterTableNavigation/>
            </TableBottomActions>
        </>
    )
});