import {Store} from "./meters/store.ts";
import {createContext, useContext} from "react";

export const store = {
    meterStore: Store.create({meters: [], addresses: {}}),
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);