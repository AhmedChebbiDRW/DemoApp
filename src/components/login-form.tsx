import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="mt-20 flex-1 justify-start p-4">
      <Text testID="form-title" className="pb-6 text-center text-2xl ">
        Votre adresse mail
      </Text>

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        // label="Email"
      />

      <Button
        testID="login-button"
        label="Continuer"
        onPress={handleSubmit(onSubmit)}
        textClassName={`${errors.email ? 'text-[#E79F80]' : ''}`}
        className={`${errors.email ? 'bg-[#FFD3C5] dark:bg-[#FFD3C5]' : ''}`}
      />
    </View>
  );
};
