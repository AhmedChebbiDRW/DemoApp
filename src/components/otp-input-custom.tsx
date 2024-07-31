/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import type { OtpInputRef } from 'react-native-otp-entry';
import { OtpInput } from 'react-native-otp-entry';

import { useEmailOtpConfirm } from '@/api/auth';
import { Button, colors, showErrorMessage, Text, View } from '@/ui';

interface OtpInputCustomProps {
  numberOfDigits: number;
  focusStickBlinkingDuration?: number;
  textInputProps?: object;
  containerStyle?: ViewStyle;
  pinCodeContainerStyle?: ViewStyle;
  pinCodeTextStyle?: TextStyle;
  focusStickStyle?: ViewStyle;
  focusedPinCodeContainerStyle?: ViewStyle;
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
}

export const OtpInputCustom = ({
  numberOfDigits,
  focusStickBlinkingDuration = 500,
  textInputProps,
  containerStyle,
  pinCodeContainerStyle,
  pinCodeTextStyle,
  focusStickStyle,
  focusedPinCodeContainerStyle,
  isModalVisible,
  setModalVisible,
  userEmail,
}: OtpInputCustomProps) => {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colors.white : colors.neutral[900];
  const otpInput = React.useRef<OtpInputRef>(null);
  const { mutate: emailOtpConfirm, isPending } = useEmailOtpConfirm();
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailOtpConfirm = async () => {
    try {
      // Simulate API request
      emailOtpConfirm(
        { email: userEmail, otp },
        {
          onSuccess: (response) => {
            setSuccess(response.status);
          },
          onError: () => {
            // TODO: Handle error
            showErrorMessage('Failed to confirm email');
          },
        }
      );
    } catch (error: any) {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      setModalVisible(false);
    }
  };

  const handleEmailOtpVerified = () => {
    // If OTP is verified, navigate to the next screen
    setModalVisible(false);
    router.push('/sign-up');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      ...containerStyle,
    },
    pinCodeContainer: {
      borderWidth: 1,
      borderColor: color,
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        colorScheme === 'dark' ? colors.neutral[600] : colors.neutral[100],
      ...pinCodeContainerStyle,
    },
    pinCodeText: {
      fontSize: 20,
      color: color,
      ...pinCodeTextStyle,
    },
    focusStick: {
      width: 1,
      height: '100%',
      backgroundColor:
        colorScheme === 'dark' ? colors.white : colors.neutral[100],
      ...focusStickStyle,
    },
    activePinCodeContainer: {
      borderWidth: 2,
      borderColor:
        colorScheme === 'dark' ? colors.primary[700] : colors.primary[500],
      ...focusedPinCodeContainerStyle,
    },
  });

  return (
    <View className="flex-1 items-center justify-center">
      <Modal
        testID={'otp-modal'}
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={() => setModalVisible(false)}
      >
        {success ? (
          <View className="flex items-center justify-center bg-neutral-400 dark:bg-neutral-600">
            <View className="flex w-full items-center justify-center p-4 text-center">
              <Text className="text-center text-xl">
                Your email has been successfully Verified.
              </Text>
            </View>

            <View className="w-full flex-row items-center justify-center p-4">
              <Button
                testID="verified-otp-button"
                label="OK"
                onPress={handleEmailOtpVerified}
                textClassName="text-xl"
                className=""
              />
            </View>
          </View>
        ) : (
          <View className="flex items-center justify-center bg-neutral-400 dark:bg-neutral-600">
            <View className="flex w-full items-center justify-center p-4 text-center">
              <Text className="text-center text-xl">
                An OTP has been sent to your email. Please enter it below to
                proceed.
              </Text>
            </View>
            <OtpInput
              ref={otpInput}
              numberOfDigits={numberOfDigits}
              focusStickBlinkingDuration={focusStickBlinkingDuration}
              onFilled={(text) => setOtp(text)}
              textInputProps={textInputProps}
              theme={{
                containerStyle: styles.container,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
            <View className="w-full flex-row items-center justify-between p-4">
              <Button
                testID="verify-otp-button"
                label="Verify"
                loading={isPending}
                onPress={() => {
                  handleEmailOtpConfirm();
                }}
                textClassName="text-xl"
                className=""
              />
              <Button
                testID="clear-otp-button"
                label="Clear"
                onPress={() => {
                  otpInput?.current?.clear();
                }}
                textClassName="text-xl"
                className=""
              />
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};
