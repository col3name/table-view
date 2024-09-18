import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { TableNavigation } from '../../../shared/ui/table/tableNavigation';

import { useStore } from '../../../stores';

export const MeterTableNavigation = observer(() => {
  const store = useStore();

  const count = store.meterStore.countPage;
  const current = store.meterStore.currentPage;
  const isFetchingNextPage = store.meterStore.isFetchingNextPage;

  const setPage = useCallback(
    async (page: number) => {
      if (isFetchingNextPage) {
        return;
      }
      await store.meterStore.setPage(page);
    },
    [store.meterStore, isFetchingNextPage]
  );

  return <TableNavigation current={current} count={count} setPage={setPage} />;
});
