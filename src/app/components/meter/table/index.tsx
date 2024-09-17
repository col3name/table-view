import {observer} from "mobx-react";

import {
    FetchNextPageLoader,
    Table,
    TableBody,
    TableBottomActions,
    TableContainer
} from "../../../shared/components/table/ui";
import {MeterTableNavigation} from "./meterTableNavigation";
import {TableHeader} from "./TableHeader";
import {MeterRow} from "./MeterRow";

import {useStore} from "../../../stores";

const headerSizes = [2, 4, 8, 8, 10, 30, 8, 8];


export const MeterTable = observer(() => {
    const store = useStore();

    const meters = store.meterStore.meterList;
    const loading = store.meterStore.meterLoading;
    const isFetchingNextPage = store.meterStore.isFetchingNextPage;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHeader headerSizes={headerSizes}/>

                    <TableBody>
                        {isFetchingNextPage && <FetchNextPageLoader/>}
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            meters.map((meter) => {
                                return (
                                    <MeterRow key={meter.id}
                                              place={meter.place}
                                              headerSizes={headerSizes} meter={meter}/>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableBottomActions>
                <MeterTableNavigation/>
            </TableBottomActions>
        </>
    )
});