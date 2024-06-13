import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';

import { useModalStore } from './modal-store';

export const useAlwaysOpenModal = () => {
  const ref = React.useRef<BottomSheetModal>(null);
  const showModal = useModalStore((state) => state.showModal);
  const hideModal = useModalStore((state) => state.hideModal);

  const present = React.useCallback(
    (data?: any) => {
      ref.current?.present(data);
      showModal();
    },
    [showModal]
  );

  const dismiss = React.useCallback(() => {
    ref.current?.dismiss();
    hideModal();
  }, [hideModal]);

  return { ref, present, dismiss };
};
