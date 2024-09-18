import React, { PropsWithChildren } from 'react';

import { ErrorScreen } from './errorScreen/errorScreen';

import { logError } from '../lib/logger';
import { ClientError, ErrorLevel } from '../lib/logger';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.PureComponent<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(
      {
        level: ErrorLevel.ERROR,
        additional: {
          ...errorInfo,
          ...(error instanceof ClientError ? error.additional : {}),
        },
      },
      error
    );
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }

    return this.props.children;
  }
}
