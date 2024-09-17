"use client";
import {flow, Instance, types} from 'mobx-state-tree';
import axios from 'axios';

// const Area = types.model({
//     id: types.string,
//
// });

export const House = types.model({
    id: types.identifier,
    address: types.string,
});

export const Address = types.model({
    id: types.identifier,
    number: types.optional(types.number, 0),
    str_number: types.optional(types.string, ''),
    str_number_full: types.optional(types.string, ''),
    house: types.maybeNull(House),
});

const Meter = types.model({
    area: Address,
    brand_name: types.maybeNull(types.string),
    place: types.optional(types.number, 0),
    communication: types.string,
    description: types.string,
    id: types.string,
    initial_values: types.array(types.number),
    installation_date: types.string,
    is_automatic: types.maybeNull(types.boolean),
    model_name: types.maybeNull(types.string),
    serial_number: types.maybe(types.string),
    _type: types.array(types.string),
});


const ConfirmPopup = types.model({
    opened: types.boolean,
    data: types.maybeNull(types.string),
});

export type AddressModel = Instance<typeof Address>
export type MeterModel = Instance<typeof Meter>
const toMap = (values: Array<AddressModel>) => {
    return values.reduce((acc: Map<string, AddressModel>, it) => {
        if (!acc.has(it.id)) {
            acc.set(it.id, it);
        }
        return acc;
    }, new Map<string, AddressModel>);
};

const getAddresses = async ({
                                limit = 1,
                                offset,
                            }: { limit: number, offset: number }) => {
    try {
        const response = await axios.get(
            `http://showroom.eis24.me/api/v4/test/meters/`,
            {
                withCredentials: true,
                params: {limit: limit, offset},
            }
        );
        if (response.status > 400) {
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data = response.data;
        return data;
    } catch (error) {
        console.error({error});
        return undefined;
    }
};


const LIMIT = 20;
export const MeterStore = types
    .model({
        meters: types.array(Meter),
        addresses: types.map(Address),
        confirmDeletePopup: types.optional(ConfirmPopup, {opened: false, data: null}),
        // navigation: types.reference(Navigation),
        count: types.optional(types.number, 0),
        page: 1,
        limit: types.optional(types.number, LIMIT),
        offset: types.optional(types.number, 0),
        loading: false,
        isFetchingNextPage: false,
        deleteLoading: false,
        deleteMeterId: '',
    })
    .views((self) => ({
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

            return meters.map((it: MeterModel) => {
                const areaId: string = it.area.id;
                return (
                    {
                        ...it,
                        place: it.place,
                        area: addressMap.has(areaId) ? addressMap.get(areaId) : undefined,
                    }
                );
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
            if (isNext) {
                if (self.isFetchingNextPage) {
                    return
                }
                self.isFetchingNextPage = true;
            } else {
                if (self.loading) {
                    return;
                }
                self.loading = true;
            }

            try {
                const newOffset = (self.page - 1) * self.limit;
                // const data2 = yield getAddresses({limit: self.limit + LIMIT, offset: newOffset});
                // console.log(data2.results.map(it => it.description))
                const data = yield getAddresses({limit: self.limit, offset: newOffset});
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const results = data.results.map((it, index: number) => ({...it, place: newOffset + index + 1}));
                if (self.count !== data.count) {
                    self.count = data.count;
                }
                self.offset += results.length;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                yield self.fetchAddresses(results);
                self.meters.clear();
                self.meters.push(...results);
            } catch (error) {
                console.error('Failed to fetch meters', error);
            } finally {
                if (isNext) {
                    self.isFetchingNextPage = false;
                } else {
                    self.loading = false;
                }
            }
        }),
        fetchAddresses: flow(function* (results: Array<MeterModel>) {
            const areas: Set<string> = new Set(results.map((meter: MeterModel) => meter.area.id));
            const newUniqueIds: string[] = Array.from(areas).filter((id: string) => !self.addresses.has(id));
            if (newUniqueIds.length === 0) {
                return;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const areaFetchPromises = newUniqueIds.map((id: string) => self.fetchAddr(id))
            const addressResponse = yield Promise.allSettled(areaFetchPromises);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const list = addressResponse.map(it => it.value);
            list.forEach((addr: AddressModel) => {
                if (!self.addresses.has(addr.id)) {
                    // addr.house.address = addr.house.address.substring('г Санкт-Петербург,'.length)
                    self.addresses.set(addr.id, addr);
                }
            });
        }),
        fetchAddr: flow(function* (areaId: string) {
            const response = yield axios.get(
                'http://showroom.eis24.me/api/v4/test/areas/',
                {
                    params: {
                        id__in: areaId
                    },
                    withCredentials: true,
                }
            );
            const results = response.data.results;
            return results.at(0);
        }),
        deleteMeter: flow(function* (meterId: string) {
            if (self.deleteLoading) {
                return false;
            }
            self.deleteLoading = true;
            try {
                self.deleteMeterId = meterId;
                yield axios.delete(
                    `http://showroom.eis24.me/api/v4/test/meters/${meterId}/`
                );
                const meterIndex = self.meters.findIndex((meter: MeterModel) => meterId === meter.id);

                if (!meterIndex) {
                    return false;
                }
                const data = yield getAddresses({limit: 1, offset: self.offset - 1});

                const newAddresses = data.results;
                const newAddress = newAddresses.at(0);
                if (!newAddress) {
                    return false;
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                yield self.fetchAddresses([newAddress]);

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                self.meters = self.meters.filter((meter: MeterModel) => meter.id !== meterId) || [];
                self.meters.push(newAddress);
                return true;
            } catch (error) {
                console.error('Failed to delete meter', error);
                return false;
            } finally {
                self.deleteMeterId = '';
                self.deleteLoading = false;
            }
        }),
        confirmTheRemoveFromCart: flow(function* () {
            const meterId = self.confirmDeletePopup.data;
            if (!meterId) {
                return;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const ok = yield self.deleteMeter(meterId);
            if (!ok) {
                console.log('failed');
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            self.closeRemoveConfirmPopup();
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
