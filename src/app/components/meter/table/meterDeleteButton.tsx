import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { DeleteButton } from '../../../shared/ui/button';

import { useStore } from '../../../stores';
import { DeleteIcon } from '../../../shared/icons/DeleteIcon';

type MeterDeleteButtonProps = {
  className?: string;
  meterId: string;
  onDeleteStart: VoidFunction;
  onDeleteDone: VoidFunction;
};

export const MeterDeleteButton: React.FC<MeterDeleteButtonProps> = observer(
  ({ className = '', meterId, onDeleteStart, onDeleteDone }) => {
    const store = useStore();
    const isLoading: boolean =
      meterId === store.meterStore.deleteMeterId &&
      store.meterStore.deleteLoading;

    useEffect(() => {
      if (isLoading) {
        onDeleteStart();
      }
    }, [isLoading, onDeleteStart]);

    useEffect(() => {
      if (isLoading) {
        onDeleteDone();
      }
    }, [isLoading, onDeleteDone]);

    const handleDelete = useCallback(() => {
      if (isLoading) {
        return;
      }
      store.meterStore.openRemoveConfirmPopup(meterId);
    }, [isLoading, meterId, store.meterStore]);

    return (
      <DeleteButton
        disabled={isLoading}
        className={className}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </DeleteButton>
    );
  }
);
