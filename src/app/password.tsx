import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';

import type { PasswordFormProps } from '@/components/password-form';
import { PasswordForm } from '@/components/password-form';
import { getEmail } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const [isNewUser, setIsNewUser] = useState(true);
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const userEmail = getEmail();
  console.log('🚀 ~ Login ~ email:', email);
  console.log('🚀 ~ Login ~ userEmail:', userEmail);

  useSoftKeyboardEffect();

  const onSubmit: PasswordFormProps['onSubmit'] = (data) => {
    console.log(data);
    //TODO: check if is new user redirect to 'sign-up' else redirect to '/'
    setIsNewUser(false);
    router.push('/sign-up');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <PasswordForm onSubmit={onSubmit} isNewUser={isNewUser} />
    </>
  );
}
