import { useEffect } from 'react';

interface PopupKeyboardProps {
  opened: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const useHandleModalKeyboard = ({
  opened,
  onCancel,
  onConfirm,
}: PopupKeyboardProps): void => {
  useEffect(() => {
    if (!opened) {
      return;
    }

    const handleKeyboard = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': {
          onCancel?.();
          break;
        }
        case 'Enter': {
          onConfirm?.();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [opened, onCancel, onConfirm]);
};
