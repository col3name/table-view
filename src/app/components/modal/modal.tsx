import React, { useCallback } from 'react';

import { Portal } from '../portal/Portal';
import { H2 } from '../../shared/ui/typography';
import { CloseIcon } from '../../shared/icons/CloseIcon';

import styled from 'styled-components';

interface ModalProps {
  title?: string;
  active: boolean;
  close: () => void;
  children: React.ReactNode;
  clearState?(): void;
}

export const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Modal: React.FC<ModalProps> = ({
  clearState,
  title = '',
  active,
  close,
  children,
}) => {
  const onClose = useCallback(() => {
    clearState?.();
    close();
  }, [clearState, close]);
  return (
    <Portal id="root-modal">
      <ModalContainer $active={active} onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalContentHeader>
            <H2>{title}</H2>
            <CloseIconButton onClick={close} />
          </ModalContentHeader>
          {children}
        </ModalContent>
      </ModalContainer>
    </Portal>
  );
};

const ModalContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseIconButton = styled(CloseIcon)`
  cursor: pointer;
  box-sizing: border-box;
  border: none;
  background: transparent;
`;

const ModalContent = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 344px;
  padding: 20px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div<{ $active?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100vw;
  height: 100vh;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.$active ? 1 : 0)};
  pointer-events: ${(props) => (props.$active ? 'initial' : 'none')};
  z-index: 2;
`;
