import React from "react";
import {FetchNextPageLoader, TableBodyContainer} from "./ui.tsx";

type TableBodyProps = {
    isFetchingNextPage: boolean,
    loading: boolean,
    children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({
                                                        isFetchingNextPage,
                                                        loading,
                                                        children,
                                                    }) => {
    return (
        <TableBodyContainer>
            {isFetchingNextPage && <FetchNextPageLoader/>}
            {loading ? (
                <span>Loading...</span>
            ) : (
                children
            )}
        </TableBodyContainer>
    );
};
