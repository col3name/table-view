import React, { PropsWithChildren } from "react";

import { store, StoreContext } from "./rootStore";

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
