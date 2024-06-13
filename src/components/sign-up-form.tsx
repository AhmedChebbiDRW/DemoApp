import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { Option } from '@/ui';
import {
  Button,
  ControlledInput,
  ControlledSelect,
  ScrollView,
  Text,
  View,
} from '@/ui';
import { FemmeShoe, HommeShoe, MixteShoe } from '@/ui/icons';
import type { MultiSelectOption } from '@/ui/multi-select-grid';
import MultiSelectGrid from '@/ui/multi-select-grid';
import type { RadioOption } from '@/ui/radio-group';
import RadioGroup from '@/ui/radio-group';

const schema = z.object({
  age: z.preprocess(
    (val) => Number(val),
    z
      .number({ required_error: 'Age is required' })
      .nonnegative({ message: 'Age must be a number' })
      .min(1)
  ),
  // radio: z.boolean(),
  mode: z
    .string({ required_error: 'Please select an option' })
    .min(1, 'Please select an option'),
  marques: z.array(z.string({ required_error: 'Please select an option' })),
  select: z.number({ required_error: 'Must select a choice' }),
});

export const tailles: Option[] = [
  { value: 41, label: '41' },
  { value: 42, label: '42' },
  { value: 42.5, label: '42.5' },
  { value: 43, label: '43' },
  { value: 44, label: '44' },
  { value: 44.5, label: '44.5' },
  { value: 45, label: '45' },
];

const modeOptions: RadioOption[] = [
  { label: 'Femme', value: 'femme', Icon: <FemmeShoe /> },
  { label: 'Homme', value: 'homme', Icon: <HommeShoe /> },
  { label: 'Mixte', value: 'mixte', Icon: <MixteShoe /> },
];
const marquesOptions: MultiSelectOption[] = [
  { label: 'BALENCIAGA', value: 'BALENCIAGA' },
  { label: 'ADIDAS', value: 'ADIDAS' },
  { label: 'gucci', value: 'gucci' },
  { label: 'celine', value: 'celine' },
  { label: 'dior', value: 'dior' },
  { label: 'lanvin', value: 'lanvin' },
  { label: 'YEEZY', value: 'YEEZY' },
  { label: 'Kickers', value: 'Kickers' },
  { label: 'Camper', value: 'Camper' },
  { label: 'Dockers', value: 'Dockers' },
  { label: 'MARNI', value: 'MARNI' },
  { label: 'Guess', value: 'Guess' },
];

export type FormType = z.infer<typeof schema>;

export type SignUpFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const SignUpForm = ({ onSubmit = () => {} }: SignUpFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <ScrollView>
      <View className="mt-20 h-full flex-1 justify-start gap-1 p-4">
        <Text
          testID="form-title"
          className="pb-6 text-center font-nblack text-2xl uppercase"
        >
          tes kiffs
        </Text>

        <ControlledInput
          testID="age-input"
          control={control}
          name="age"
          label="Ton age"
          keyboardType="numeric"
          error={errors.age?.message}
        />

        <RadioGroup
          control={control}
          name="mode"
          label="Mode"
          options={modeOptions}
          error={errors.mode?.message}
        />

        <ControlledSelect
          control={control}
          name="select"
          disabled={isSubmitting}
          label="Quels est ta taille de chaussure ? "
          placeholder="Taille de chaussure"
          options={tailles}
        />

        <MultiSelectGrid
          control={control}
          name="marques"
          label="Quelles sont les marques que tu préfères ?"
          options={marquesOptions}
          error={errors.mode?.message}
        />
        <View className="my-6 flex-1 justify-end">
          <Button
            testID="login-button"
            label="Créer mon compte"
            onPress={handleSubmit(onSubmit)}
            textClassName={`${errors ? 'text-charcoal-700' : ''}`}
            className={`${
              errors.root ? 'bg-[#FFD3C5]' : ''
            } rounded-full py-2 `}
          />
        </View>
      </View>
    </ScrollView>
  );
};
