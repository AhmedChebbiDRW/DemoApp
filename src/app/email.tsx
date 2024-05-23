import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);

    router.push('/password');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
