import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';

import { useLogin } from '@/api/auth/use-login';
import { OtpInputCustom } from '@/components/otp-input-custom';
import type { PasswordFormProps } from '@/components/password-form';
import { PasswordForm } from '@/components/password-form';
import { getEmail } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';
export default function Login() {
  const [isModalVisible, setModalVisible] = useState(false);
  // const [isNewUser, setIsNewUser] = useState(true);
  const router = useRouter();
  const userEmail = getEmail();
  const { mutate: login, isPending } = useLogin();
  // const signIn = useAuth.use.signIn();
  // console.log('🚀 ~ Login ~ userEmail:', userEmail);

  useSoftKeyboardEffect();

  const onSubmit: PasswordFormProps['onSubmit'] = async (data) => {
    try {
      // API request for Login
      login(
        { email: userEmail.email, password: data.password },
        {
          onSuccess: (response) => {
            console.log(
              "🚀 ~ constonSubmit:PasswordFormProps['onSubmit']= ~ data:",
              response?.result?.user && response.result.user.isNewUser
            );
            // Save user locally
            // signIn({
            //   accessToken: response.token,
            //   refreshToken: response.refreshToken,
            //   user: response.user,
            // });
            //TODO: check if is new user redirect to 'sign-up' else redirect to '/'
            if (response?.result?.user && response.result.user.isNewUser) {
              router.push('/sign-up');
            } else {
              router.push('/');
            }
          },
          onError: (error) => {
            if (error?.response?.status === 401) {
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
