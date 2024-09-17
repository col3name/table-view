import React, {createContext, PropsWithChildren, useContext} from 'react';
import {MeterStore} from './meters/MeterStore';

const store = {
    meterStore: MeterStore.create({meters: [], addresses: {}}),
};

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
