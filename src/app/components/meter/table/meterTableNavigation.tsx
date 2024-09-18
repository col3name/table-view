import { useCallback, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { TableNavigation } from '../../../shared/ui/table/tableNavigation';

import { useStore } from '../../../stores';
import {
  useUpdateParams,
  useUrlParams,
} from '../../../shared/hooks/useQueryParams.ts';

export const MeterTableNavigation = observer(() => {
  const store = useStore();
  const updateParams = useUpdateParams();

  const { getParamInt } = useUrlParams();
  useLayoutEffect(() => {
    const page: number = getParamInt('page', 1);
    store.meterStore.setPage(page);
  }, []);

  const count = store.meterStore.countPage;
  const current = store.meterStore.currentPage;
  const isFetchingNextPage = store.meterStore.isFetchingNextPage;

  const setPage = useCallback(
    async (newPage: number) => {
      if (isFetchingNextPage) {
        return;
      }

      updateParams('page', newPage.toString());
      // setSearchParams();
      await store.meterStore.setPage(newPage);
    },
    [store.meterStore, isFetchingNextPage]
  );

  return <TableNavigation current={current} count={count} setPage={setPage} />;
});
