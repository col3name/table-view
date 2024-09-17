import React, {memo} from "react";

import {HeaderCell, HeaderRow} from "../../../shared/components/table/ui";

type TableHeaderProps = {
    headerSizes: number[];
};

export const TableHeader: React.FC<TableHeaderProps> = memo(function TableHeader({
                                                         headerSizes
                                                     }) {
    return (
        <HeaderRow>
            <HeaderCell $percent={headerSizes[0]}>№</HeaderCell>
            <HeaderCell $percent={headerSizes[1]}>Тип</HeaderCell>
            <HeaderCell $percent={headerSizes[2]}>Дата установки</HeaderCell>
            <HeaderCell $percent={headerSizes[3]}>Автоматический</HeaderCell>
            <HeaderCell $percent={headerSizes[4]}>Текущине показания</HeaderCell>
            <HeaderCell $percent={headerSizes[5]}>Адрес</HeaderCell>
            <HeaderCell $percent={headerSizes[6]}>Примечание</HeaderCell>
            <HeaderCell $percent={headerSizes[7]}></HeaderCell>
        </HeaderRow>
    );
});
