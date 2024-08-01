import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';

import { useLogin } from '@/api/auth/use-login';
import { OtpInputCustom } from '@/components/otp-input-custom';
import type { PasswordFormProps } from '@/components/password-form';
import { PasswordForm } from '@/components/password-form';
import { signIn, useIsFirstTime } from '@/core';
import { getEmail } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';
export default function Login() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [_, setIsFirstTime] = useIsFirstTime();

  const router = useRouter();
  const userEmail = getEmail();
  const { mutate: login, isPending } = useLogin();

  useSoftKeyboardEffect();

  const onSubmit: PasswordFormProps['onSubmit'] = async (data) => {
    try {
      // API request for Login
      login(
        { email: userEmail.email, password: data.password },
        {
          onSuccess: (response) => {
            // Save user locally
            signIn({
              accessToken: response?.result?.token,
              refreshToken: response?.result?.refreshToken,
              user: response?.result?.user,
            });

            //Check if is new user redirect to 'sign-up' else redirect to '/'
            if (response?.result?.user && response.result.user.isNewUser) {
              setIsFirstTime(false);
              router.push('/sign-up');
            } else {
              router.push('/');
            }
          },
          onError: (error) => {
            if (
              error?.response?.status === 401 ||
              error?.response?.status === 403
            ) {
              setModalVisible(true);
            } else {
              showErrorMessage('Error handling login');
            }
          },
        }
      );
    } catch (error: any) {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <PasswordForm
        onSubmit={onSubmit}
        isNewUser={true}
        isPending={isPending}
      />

      <OtpInputCustom
        numberOfDigits={6}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        userEmail={userEmail.email}
      />
    </>
  );
}
