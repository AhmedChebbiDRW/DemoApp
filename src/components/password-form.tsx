import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters'),
});

export type FormType = z.infer<typeof schema>;

export type PasswordFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isNewUser: boolean;
};

export const PasswordForm = ({
  onSubmit = () => {},
  isNewUser,
}: PasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="mt-20 flex-1 justify-start  p-4">
      <Text
        testID="form-title"
        className="pb-6 text-center font-nblack text-2xl uppercase"
      >
        {isNewUser ? 'Cree un mot de passe' : 'TOn mot de passe'}
      </Text>
      <View className="relative">
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={!showPassword}
        />
        <Button
          variant="ghost"
          className="absolute right-0 top-8 w-fit"
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Ionicons name="eye-outline" size={24} color="black" />
          ) : (
            <Ionicons name="eye-off-outline" size={24} color="black" />
          )}
        </Button>
      </View>
      <Button
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
        textClassName={`${errors.password ? 'text-[#E79F80]' : ''}`}
        className={`${errors.password ? 'bg-[#FFD3C5]' : ''}`}
      />
    </View>
  );
};
