import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";

import { StoreProvider } from "./app/stores";
import { NotificationsProvider } from "./app/services/notifications";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </StoreProvider>
  </StrictMode>,
);
