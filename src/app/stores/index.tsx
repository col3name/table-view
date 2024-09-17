import React, {createContext, PropsWithChildren, useContext} from 'react';
import {Store} from './meters/store.ts';

const store = {
    meterStore: Store.create({meters: [], addresses: {}}),
};

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
