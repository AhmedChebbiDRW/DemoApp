import { useRouter } from 'expo-router';
import React from 'react';

import type { SignUpFormProps } from '@/components/sign-up-form';
import { SignUpForm } from '@/components/sign-up-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function SignUp() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  useSoftKeyboardEffect();

  const onSubmit: SignUpFormProps['onSubmit'] = (data) => {
    console.log('SignUp Screen', data);
    signIn({ accessToken: 'access-token', refreshToken: 'refresh-token' });
    router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
}
