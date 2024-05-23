import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import type { PasswordFormProps } from '@/components/password-form';
import { PasswordForm } from '@/components/password-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const [isNewUser, setIsNewUser] = useState(true);
  const router = useRouter();

  useSoftKeyboardEffect();

  const onSubmit: PasswordFormProps['onSubmit'] = (data) => {
    console.log(data);
    setIsNewUser(false);
    //TODO: check if is new user redirect to 'sign-up' else redirect to '/'
    router.push('/sign-up');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <PasswordForm onSubmit={onSubmit} isNewUser={isNewUser} />
    </>
  );
}
