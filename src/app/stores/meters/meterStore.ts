import axios, { CanceledError, CancelTokenSource } from 'axios';
import { flow, types } from 'mobx-state-tree';

import {
  Address,
  AddressModel,
  ConfirmPopup,
  Meter,
  MeterModel,
} from './model';
import { deleteMeter, getAddresses, getArea } from '../../api/meters';
import { toMap } from './util';

const getPlaceStart = (page: number, limit: number, index: number) => {
  return (page - 1) * limit + index + 1;
};

const LIMIT = 20;
type CancelToken = {
  cancelSource: CancelTokenSource;
  cancelTokens: Map<string, CancelTokenSource>;
};

export const MeterStore = types
  .model({
    meters: types.array(Meter),
    addresses: types.map(Address),
    confirmDeletePopup: types.optional(ConfirmPopup, {
      opened: false,
      data: null,
    }),
    count: types.optional(types.number, 0),
    page: 1,
    limit: types.optional(types.number, LIMIT),
    offset: types.optional(types.number, 0),
    loading: false,
    isFetchingNextPage: false,
    deleteLoading: false,
    deleteMeterId: '',
  })
  .volatile(
    (): CancelToken => ({
      cancelSource: axios.CancelToken.source(),
      cancelTokens: new Map<string, CancelTokenSource>(),
    })
  )
  .views((self) => ({
    get isOutsidePage(): boolean {
      if (self.count === 0) {
        return false;
      }
      return Math.ceil(self.count / self.limit) < self.page;
    },
    get currentPage() {
      return self.page;
    },
    get countPage() {
      return Math.ceil(self.count / self.limit);
    },
    get meterList() {
      const values = Array.from(self.addresses.values());
      const addressMap: Map<string, AddressModel> = toMap(values);
      const meters: MeterModel[] = Array.from(self.meters.values()) || [];

      return meters.map((it: MeterModel, index: number) => {
        const areaId: string = it.area.id;
        return {
          ...it,
          place: getPlaceStart(self.page, self.limit, index),
          area: addressMap.has(areaId) ? addressMap.get(areaId) : undefined,
        };
      });
    },
    get meterLoading(): boolean {
      return self.loading;
    },
  }))
  .actions((self) => ({
    setPage: flow(function* (page: number) {
      if (page === self.page) {
        return;
      }
      self.page = page;
      let newOffset = self.limit * (page - 1);
      if (newOffset > self.offset) {
        newOffset -= self.limit;
      }
      self.offset = newOffset;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      yield self.fetchMeters(true);
    }),
    fetchMeters: flow(function* (isNext: boolean = false) {
      if (self.isFetchingNextPage) {
        return;
      }
      if (isNext) {
        self.isFetchingNextPage = true;
      } else {
        if (self.loading) {
          return;
        }
        self.loading = true;
      }

      try {
        self.cancelSource.cancel();
        self.cancelSource = axios.CancelToken.source();
        const newOffset = (self.page - 1) * self.limit;
        const data = yield getAddresses({
          limit: self.limit,
          offset: newOffset,
          cancelToken: self.cancelSource.token,
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const results = data?.results;
        if (!results) {
          self.isFetchingNextPage = false;
          return;
        }
        if (self.count !== data.count) {
          self.count = data.count;
        }
        self.offset += results.length;

        const areas: Set<string> = new Set(
          results.map((meter: MeterModel) => meter.area.id)
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yield self.fetchAddresses(areas);
        self.meters.clear();
        self.meters.push(...results);
      } catch (error) {
        if (axios.isCancel(error) || error instanceof CanceledError) {
          console.log(
            `Request getMeters limit:${self.limit}, offset: ${self.offset} canceled:`,
            error.message
          );
        } else if (error instanceof Error) {
          console.error('Failed to fetch meters', error);
        }
      } finally {
        if (isNext) {
          self.isFetchingNextPage = false;
        } else {
          self.loading = false;
        }
      }
    }),
    fetchAddresses: flow(function* (areas: Set<string>) {
      const newUniqueIds: string[] = Array.from(areas).filter(
        (id: string) => !self.addresses.has(id)
      );
      if (newUniqueIds.length === 0) {
        return;
      }

      const areaFetchPromises = newUniqueIds.map((id: string) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        self.fetchAddr(id)
      );
      const addressResponse = yield Promise.allSettled(areaFetchPromises);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      addressResponse.forEach((it) => {
        const addr = it.value;
        if (!self.addresses.has(addr.id)) {
          self.addresses.set(addr.id, addr);
        }
      });
    }),
    fetchAddr: flow(function* (areaId: string) {
      const cancelTokenId = 'getArea:' + areaId;
      try {
        if (self.cancelTokens.has(cancelTokenId)) {
          self.cancelTokens.get(cancelTokenId)?.cancel();
        }
        const cancelSource = axios.CancelToken.source();
        self.cancelTokens.set(cancelTokenId, cancelSource);

        return yield getArea(areaId);
      } catch (error) {
        if (axios.isCancel(error) || error instanceof CanceledError) {
          console.log(`Fetch area ${areaId} canceled:`, error.message);
          if (self.cancelTokens.has(cancelTokenId)) {
            self.cancelTokens.get(cancelTokenId)?.cancel();
          }
        }
      }
    }),
    deleteMeter: flow(function* (meterId: string) {
      if (self.deleteLoading) {
        return false;
      }
      self.deleteLoading = true;
      try {
        self.cancelSource.cancel();
        self.cancelSource = axios.CancelToken.source();
        self.deleteMeterId = meterId;
        const ok = yield deleteMeter(meterId, self.cancelSource.token);
        if (!ok) {
          return false;
        }
        const meterIndex = self.meters.findIndex(
          (meter: MeterModel) => meterId === meter.id
        );

        if (!meterIndex) {
          return false;
        }
        self.cancelSource.cancel();
        self.cancelSource = axios.CancelToken.source();
        const data = yield getAddresses({
          limit: 1,
          offset: self.offset - 1,
          cancelToken: self.cancelSource.token,
        });

        const newAddresses = data?.results;
        if (!newAddresses) {
          return;
        }
        const newAddress = newAddresses.at(0);

        if (!newAddress) {
          return false;
        }
        // debugger;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yield self.fetchAddresses(new Set([newAddress.area.id]));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        self.meters =
          self.meters.filter((meter: MeterModel) => meter.id !== meterId) || [];
        self.meters.push(newAddress);
        return true;
      } catch (error) {
        if (axios.isCancel(error) || error instanceof CanceledError) {
          console.log(
            `Request delete meter ${meterId} canceled:`,
            error.message
          );
        } else if (error instanceof Error) {
          console.error('Failed to delete meter', error);
        }
        return false;
      } finally {
        self.deleteMeterId = '';
        self.deleteLoading = false;
      }
    }),
    confirmTheRemoveFromCart: flow(function* () {
      const meterId = self.confirmDeletePopup.data;
      if (!meterId) {
        return {
          isOk: false,
          message: 'Метка не существует',
        };
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const ok = yield self.deleteMeter(meterId);
      if (!ok) {
        return {
          isOk: false,
          message: 'Не удалось удалить счетчик',
        };
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      self.closeRemoveConfirmPopup();
      return {
        isOk: true,
      };
    }),
    closeRemoveConfirmPopup: () => {
      if (!self.confirmDeletePopup.opened) {
        return;
      }
      self.confirmDeletePopup.data = null;
      self.confirmDeletePopup.opened = false;
    },
    openRemoveConfirmPopup: (meterId: string) => {
      if (self.confirmDeletePopup.opened) {
        return;
      }
      self.confirmDeletePopup.data = meterId;
      self.confirmDeletePopup.opened = true;
    },
  }));
