/* eslint-disable max-lines-per-function */
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ImageBackground } from 'react-native';

import { useIsFirstTime } from '@/core';
import { Button, FocusAwareStatusBar, Image, Text, View } from '@/ui';
import images from '@/ui/images/images';
export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  return (
    <View className="h-full w-full flex-1 items-center justify-center">
      <FocusAwareStatusBar />
      <ImageBackground
        source={images.backgroundImage}
        resizeMode="cover"
        className="h-full w-full"
      >
        <View className=" ml-2 mt-14 w-5/6 flex-1 items-center justify-center px-6">
          <Text className="items-center justify-center font-nhdmedium text-4xl font-semibold uppercase text-white">
            Scanne ta paire TROUVE LA {'\n'}MOINS CH&eacute;re
          </Text>
        </View>
        <View className="relative w-full items-center justify-end gap-2 rounded-full p-4">
          <View className="flex-row items-center justify-center gap-4 ">
            <Button
              onPress={() =>
                Alert.alert(
                  'Alert title',
                  'Here’s some alert text. It can span multiple lines if needed!',
                  [
                    {
                      text: 'Action',
                      onPress: () => console.log('Action 1 Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Action',
                      onPress: () => console.log('Action 2 Pressed'),
                      style: 'cancel',
                    },
                  ],
                  { cancelable: true }
                )
              }
              className="h-11 w-14 items-center justify-center rounded-full bg-white"
            >
              <Image
                source={images.googleIcon}
                contentFit="contain"
                className="h-6 w-6"
              />
            </Button>
            <Button
              onPress={() =>
                Alert.alert(
                  'Alert title',
                  'Here’s some alert text. It can span multiple lines if needed!',
                  [
                    {
                      text: 'Action',
                      onPress: () => console.log('Action 1 Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Action',
                      onPress: () => console.log('Action 2 Pressed'),
                      style: 'cancel',
                    },
                  ],
                  { cancelable: true }
                )
              }
              className="h-11 w-14 items-center justify-center rounded-full bg-white"
            >
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </Button>
            <Button
              onPress={() =>
                Alert.alert(
                  'Alert title',
                  'Here’s some alert text. It can span multiple lines if needed!',
                  [
                    {
                      text: 'Action',
                      onPress: () => console.log('Action 1 Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Action',
                      onPress: () => console.log('Action 2 Pressed'),
                      style: 'cancel',
                    },
                  ],
                  { cancelable: true }
                )
              }
              className="h-11 w-14 items-center justify-center rounded-full bg-white"
            >
              <Ionicons name="logo-apple" size={24} color="black" />
            </Button>
          </View>
          <Text className="font-nhdbold text-xl text-white">ou</Text>
          <View className="w-full items-center justify-center">
            <Button
              className="h-14 w-full items-center justify-center rounded-full bg-white text-lg"
              label="Continue par email"
              textClassName=""
              onPress={() => {
                setIsFirstTime(false);
                router.push('/email');
              }}
            >
              <View className="flex-1 flex-row items-center justify-center">
                <Text className="ml-auto font-nhdroman text-xl font-medium">
                  Continue par email
                </Text>
                <View className="ml-auto items-center justify-center rounded-full bg-black ">
                  <FontAwesome6
                    name="arrow-right-long"
                    size={18}
                    color="white"
                    className="py-3 pl-12 pr-2"
                  />
                </View>
              </View>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
