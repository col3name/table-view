//
// "use client";
// import {flow, Instance, types} from 'mobx-state-tree';
//
//
// const Popup = types.model({
// });
//
// export type AddressModel = Instance<typeof Address>
//
// const LIMIT = 20;
// export const MeterStore = types
//     .model({
//         popups:
//     })
//
//     .actions((self) => ({
//         setPage: flow(function* (page: number) {
//             if (page === self.page) {
//                 return;
//             }
//             self.page = page;
//             let newOffset = self.limit * (page - 1);
//             if (newOffset > self.offset) {
//                 newOffset -= self.limit;
//             }
//             self.offset = newOffset;
//             yield self.fetchMeters(true);
//         }),
//
//     }));
