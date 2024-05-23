import React, { useCallback } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from '@/ui/colors';

import { Text } from './text';

const multiSelectGridTv = tv({
  slots: {
    container: 'mb-4',
    label: 'text-grey-100 dark:text-neutral-100 text-lg mb-1',
    grid: 'flex-wrap flex-row',
    card: 'items-center justify-center m-2 px-4 py-2 rounded-full',
    cardText: 'text-center',
  },
  variants: {
    error: {
      true: {
        input: 'border-[#FD4104]',
        label: 'text-[#E79F80] dark:text-[#E79F80]',
      },
    },
    disabled: {
      true: {
        label: 'text-neutral-400 dark:text-neutral-500',
        cardText: 'text-neutral-400 dark:text-neutral-500',
      },
    },
  },
});

export type MultiSelectOption = {
  label: string;
  value: string | number;
};

interface MultiSelectGridProps<T extends FieldValues> {
  options: MultiSelectOption[];
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  disabled?: boolean;
}

const MultiSelectGrid = <T extends FieldValues>({
  options,
  name,
  control,
  label,
  error,
  disabled = false,
}: MultiSelectGridProps<T>) => {
  const { field } = useController({
    control,
    name,
  });

  const handlePress = useCallback(
    (value: string | number) => {
      if (!disabled) {
        const newValue = field.value?.includes(value)
          ? field.value.filter((v: string | number) => v !== value)
          : [...(field.value || []), value];
        field.onChange(newValue);
      }
    },
    [disabled, field]
  );

  const styles = multiSelectGridTv({
    error: error ? true : undefined,
    disabled: disabled ? true : undefined,
  });

  return (
    <View className={styles.container()}>
      {label && <Text className={styles.label()}>{label}</Text>}
      <View className={styles.grid()}>
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            className={styles.card()}
            style={{
              backgroundColor: field?.value?.includes(option.value)
                ? colors.primary[600]
                : colors.white,
              borderColor: field?.value?.includes(option.value)
                ? colors.primary[600]
                : colors.primary[600],
            }}
            disabled={disabled}
          >
            <Text
              className={styles.cardText()}
              style={{
                color: field?.value?.includes(option.value)
                  ? colors.white
                  : colors.charcoal[900],
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {error && (
        <Text className="text-sm text-danger-300 dark:text-danger-600">
          {error}
        </Text>
      )}
    </View>
  );
};

export default MultiSelectGrid;
