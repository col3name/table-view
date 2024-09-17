import React, {memo} from "react";

import {HeaderCell, HeaderRow} from "../../../shared/components/table/ui";

import {HeaderItem} from "./table.types";


type TableHeaderProps = {
    headers: HeaderItem[];
};

export const TableHeader: React.FC<TableHeaderProps> = memo(function TableHeader({
                                                                                     headers
                                                                                 }) {
    return (
        <HeaderRow>
            {headers.map((header: HeaderItem) =>(
                <HeaderCell $percent={header.percent}>{header.label}</HeaderCell>
            ))}
        </HeaderRow>
    );
});
