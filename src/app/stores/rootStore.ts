import { createContext, useContext } from "react";

import { MeterStore } from "./meters/meterStore";
import { NotificationStore } from "./notifications";

export const store = {
  meterStore: MeterStore.create({ meters: [], addresses: {} }),
  notificationStore: NotificationStore.create({ notifications: [] }),
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
