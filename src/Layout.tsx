import React, { PropsWithChildren } from 'react';
import { Container } from './app/shared/ui/container';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};
