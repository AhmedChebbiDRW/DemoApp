import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import type { PasswordFormProps } from '@/components/password-form';
import { PasswordForm } from '@/components/password-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const [isNewUser, setIsNewUser] = useState(true);
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: PasswordFormProps['onSubmit'] = (data) => {
    console.log(data);
    setIsNewUser(false);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <PasswordForm onSubmit={onSubmit} isNewUser={isNewUser} />
    </>
  );
}
