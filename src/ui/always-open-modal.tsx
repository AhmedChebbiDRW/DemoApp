import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useModalStore } from '@/core/modal/modal-store';
import { useAlwaysOpenModal } from '@/core/modal/use-always-open-modal';

import { Text } from './text';

type ModalProps = BottomSheetModalProps & {
  title?: string;
  skaners?: number;
};

type ModalRef = React.ForwardedRef<BottomSheetModal>;

export const AlwaysOpenModal = React.forwardRef(
  (
    {
      snapPoints: _snapPoints = ['10%', '60%'],
      title,
      skaners = 0,
      detached = false,
      ...props
    }: ModalProps,
    ref: ModalRef
  ) => {
    const detachedProps = React.useMemo(
      () => getDetachedProps(detached),
      [detached]
    );
    const modal = useAlwaysOpenModal();
    const snapPoints = React.useMemo(() => _snapPoints, [_snapPoints]);
    const isVisible = useModalStore((state) => state.isVisible);

    React.useImperativeHandle(
      ref,
      () => (modal.ref.current as BottomSheetModal) || null
    );

    const renderHandleComponent = React.useCallback(
      () => (
        <View className="rounded-2xl dark:bg-gray-900">
          <View className="mb-8 mt-2 h-1 w-12 self-center rounded-lg bg-gray-900 dark:bg-gray-300" />
          <ModalHeader title={title} skaners={skaners} />
        </View>
      ),
      [title, skaners]
    );

    useEffect(() => {
      if (!isVisible && modal.ref.current) {
        modal.ref.current.dismiss();
      }
    }, [isVisible, modal.ref]);

    return (
      <BottomSheetModal
        {...props}
        {...detachedProps}
        ref={modal.ref}
        index={isVisible ? 1 : -1} // Control visibility with Zustand state
        snapPoints={snapPoints}
        handleComponent={renderHandleComponent}
        enableDismissOnClose={false} // Prevent dismiss on close
        backdropComponent={null} // Remove the backdrop
      />
    );
  }
);

const getDetachedProps = (detached: boolean) => {
  if (detached) {
    return {
      detached: true,
      bottomInset: 46,
      style: { marginHorizontal: 16, overflow: 'hidden' },
    } as Partial<BottomSheetModalProps>;
  }
  return {} as Partial<BottomSheetModalProps>;
};

const ModalHeader = React.memo(
  ({ title, skaners }: { title?: string; skaners?: number }) => {
    return (
      <>
        {title && (
          <View className="flex-row px-2 py-4 dark:bg-gray-900">
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-center font-nhdmedium text-[20px] text-[#26313D] dark:text-white">
                {title}
              </Text>
              <Text className="text-center font-mono text-[16px] text-[#26313D] dark:text-white">
                {skaners} skaners
              </Text>
            </View>
          </View>
        )}
      </>
    );
  }
);
