/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import React, { useState } from 'react';

import { useGoogleRegister } from '@/api/auth/use-google-register';
import { signIn, useIsFirstTime } from '@/core';
import { Button, Image, showErrorMessage, View } from '@/ui';
import images from '@/ui/images/images';

GoogleSignin.configure({
  webClientId: Env.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['profile', 'email'],
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export const GoogleSignInButton = () => {
  const [loading, setLoading] = useState(false);
  const { mutate: googleRegister } = useGoogleRegister();
  const [_, setIsFirstTime] = useIsFirstTime();

  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const googleResponse = await GoogleLogin();
      const { idToken, user } = googleResponse;

      if (idToken) {
        googleRegister(
          {
            id: user.id,
            firstName: user?.givenName ?? '',
            lastName: user?.familyName ?? '',
            email: user.email,
            picture: user?.photo ?? '',
          },
          {
            onSuccess: (response) => {
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
            onError: () => {
              showErrorMessage('Error while handling user register');
            },
          }
        );
      }
    } catch (apiError: any) {
      showErrorMessage(
        apiError?.response?.data?.error?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <Button
        onPress={handleGoogleLogin}
        loading={loading}
        className="h-11 w-14 items-center justify-center rounded-full bg-white"
      >
        <Image
          source={images.googleIcon}
          contentFit="contain"
          className="h-6 w-6"
        />
      </Button>
    </View>
  );
};
