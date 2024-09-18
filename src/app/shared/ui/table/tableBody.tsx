import React from 'react';
import { FetchNextPageLoader, TableBodyContainer } from './ui';

type TableBodyProps = {
  isFetchingNextPage: boolean;
  loading: boolean;
  children: React.ReactNode;
};

export const TableBody: React.FC<TableBodyProps> = ({
  isFetchingNextPage,
  loading,
  children,
}) => {
  return (
    <TableBodyContainer>
      {isFetchingNextPage && <FetchNextPageLoader />}
      {loading ? <span style={{position: 'absolute', top: '50%', left: '50%'}}>Loading...</span> : children}
    </TableBodyContainer>
  );
};
