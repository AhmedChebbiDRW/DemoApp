import React from 'react';

import type { SignUpFormProps } from '@/components/sign-up-form';
import { SignUpForm } from '@/components/sign-up-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function SignUp() {
  // const router = useRouter();
  useSoftKeyboardEffect();

  const onSubmit: SignUpFormProps['onSubmit'] = (data) => {
    console.log('SignUp Screen', data);
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
}
