import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { View } from 'react-native';

import { Text } from './text';

type ModalProps = BottomSheetModalProps & {
  title?: string;
  skaners?: number;
};

type ModalRef = React.ForwardedRef<BottomSheetModal>;

type ModalHeaderProps = {
  title?: string;
  skaners?: number;
};

export const useAlwaysOpenModal = () => {
  const ref = React.useRef<BottomSheetModal>(null);
  const present = React.useCallback((data?: any) => {
    ref.current?.present(data);
  }, []);
  const dismiss = React.useCallback(() => {
    // Prevent dismiss
  }, []);
  return { ref, present, dismiss };
};

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

    React.useImperativeHandle(
      ref,
      () => (modal.ref.current as BottomSheetModal) || null
    );

    const renderHandleComponent = React.useCallback(
      () => (
        <>
          <View className="mb-8 mt-2 h-1 w-12 self-center rounded-lg bg-gray-400 dark:bg-gray-700" />
          <ModalHeader title={title} skaners={skaners} />
        </>
      ),
      [title, skaners]
    );

    return (
      <BottomSheetModal
        {...props}
        {...detachedProps}
        ref={modal.ref}
        index={1} // Start at the expanded state
        snapPoints={snapPoints}
        handleComponent={renderHandleComponent}
        enableDismissOnClose={false} // Prevent dismiss on close
        backdropComponent={null} // Remove the backdrop
      />
    );
  }
);

/**
 *
 * @param detached
 * @returns
 *
 * @description
 * In case the modal is detached, we need to add some extra props to the modal to make it look like a detached modal.
 */

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

/**
 * ModalHeader
 */

const ModalHeader = React.memo(({ title, skaners }: ModalHeaderProps) => {
  return (
    <>
      {title && (
        <View className="flex-row px-2 py-4">
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
});
