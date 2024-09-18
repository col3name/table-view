import React, { useMemo } from 'react';

import { TableNavigationContainer } from './ui';
import { NavButton } from './navButton';

const getPages = (count: number, current: number): number[] => {
  if (count > 10) {
    if (current < 4 || current >= count - 2) {
      return [1, 2, 3, 4, NaN, count - 3, count - 2, count - 1, count];
    }
    return [1, NaN, current - 1, current, current + 1, NaN, count - 1, count];
  }
  return [];
};

type TableNavigationProps = {
  count: number;
  current: number;
  setPage: (page: number) => void;
};

export const TableNavigation: React.FC<TableNavigationProps> = ({
  count,
  current,
  setPage,
}) => {
  const pages = useMemo(() => getPages(count, current), [count, current]);

  return (
    <TableNavigationContainer>
      {pages.map((page: number, index: number) => {
        return (
          <NavButton
            key={page + ':' + index}
            setPage={setPage}
            active={page === current}
            page={page}
          />
        );
      })}
    </TableNavigationContainer>
  );
};
