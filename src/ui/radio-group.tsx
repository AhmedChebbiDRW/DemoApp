import { MotiView } from 'moti';
import React, { useCallback } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from '@/ui/colors';

import { Text } from './text';

const SIZE = 15;

const radioGroupTv = tv({
  slots: {
    container: 'mb-4 justify-center items-start py-2 gap-2',
    label: 'text-grey-100 dark:text-neutral-100 text-lg mb-1 font-pmedium',
    radioItem: 'flex-row w-16 h-16 items-center mb-2 flex-1',
    radioIcon: 'mr-2',
    radioLabel: 'dark:text-neutral-100 w-full text-center font-pmedium',
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
        radioLabel: 'text-neutral-400 dark:text-neutral-500',
      },
    },
  },
});

export type RadioOption = {
  label: string;
  value: string | number;
  Icon?: React.ReactNode;
};

interface RadioGroupProps<T extends FieldValues> {
  options: RadioOption[];
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  disabled?: boolean;
}

const RadioIcon = ({ checked }: { checked: boolean }) => {
  const color = checked ? colors.primary[300] : colors.charcoal[400];
  return (
    <MotiView
      style={{
        height: SIZE,
        width: SIZE,
        borderColor: color,
      }}
      className="items-center justify-center rounded-[15px] border-2 bg-transparent"
      from={{ borderColor: '#CCCFD6' }}
      animate={{
        borderColor: color,
      }}
      transition={{ duration: 100, type: 'timing' }}
    >
      <MotiView
        className={`h-[5px] w-[5px] rounded-[5px] ${
          checked ? 'bg-primary-300' : ''
        } `}
        from={{ opacity: 0 }}
        animate={{ opacity: checked ? 1 : 0 }}
        transition={{ duration: 50, type: 'timing' }}
      />
    </MotiView>
  );
};

const RadioGroup = <T extends FieldValues>({
  options,
  name,
  control,
  label,
  error,
  disabled = false,
}: RadioGroupProps<T>) => {
  const { field } = useController({
    control,
    name,
  });

  const handlePress = useCallback(
    (value: string | number) => {
      if (!disabled) {
        field.onChange(value);
      }
    },
    [disabled, field]
  );

  const styles = radioGroupTv({
    error: error ? true : undefined,
    disabled: disabled ? true : undefined,
  });

  return (
    <View className={styles.container()}>
      {label && <Text className={styles.label()}>{label}</Text>}
      <View className="flex-row p-4">
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            className={`${styles.radioItem()} `}
            disabled={disabled}
          >
            <View
              className={`mr-2 flex-row rounded-lg ${
                field.value === option.value ? 'border-primary-600' : ''
              } border
              border-[#DFBBAC] p-2`}
            >
              <View className="h-24 w-20 items-center justify-center gap-5 py-8 ">
                {option?.Icon ?? option.Icon}
                <Text className={styles.radioLabel()}>{option.label}</Text>
              </View>
              <View className="flex-1">
                <RadioIcon checked={field.value === option.value} />
              </View>
            </View>
          </Pressable>
        ))}
        {error && (
          <Text className="text-sm text-danger-300 dark:text-danger-600">
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

export default RadioGroup;
