import React from 'react';

import { StoreProvider } from './app/stores';
import { NotificationsProvider } from './app/services/notifications';
import { ErrorBoundary } from './app/shared/ui/errorBoundary';

import './App.css';

import { AppRouter } from './Routes';

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <NotificationsProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </NotificationsProvider>
    </StoreProvider>
  );
};
