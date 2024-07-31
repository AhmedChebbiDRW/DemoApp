/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import type { CameraCapturedPicture } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native';

import { useSearchPhoto } from '@/api/upload';
import AWSHelper from '@/core/aws-helper/aws-helper';
import { showErrorMessage } from '@/ui';

interface CameraPreviewProps {
  photo: CameraCapturedPicture | null;
  retakePicture: () => void;
  savePhoto?: () => void;
}

const results = [
  {
    href: 'footlocker.fr',
    price: 169,
  },
  {
    href: 'footlocker.fr',
    price: 159,
  },
  {
    href: 'footlocker.fr',
    price: 149,
  },
  {
    href: 'footlocker.fr',
    price: 139,
  },
  {
    href: 'footlocker.fr',
    price: 129,
  },
];

const CameraPreview = ({ photo, retakePicture }: CameraPreviewProps) => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { uploadS3File } = AWSHelper();
  const { mutate: searchPhoto } = useSearchPhoto();

  const sendImage = async () => {
    if (!photo) return;

    try {
      setIsLoading(true);
      const localPhoto = await fetch(photo.uri);
      const blob = await localPhoto.blob();

      const fileName = 'photo'; // You can generate a unique name if needed
      const result = await uploadS3File(blob, fileName);
      if (result) {
        try {
          // API request for Login
          searchPhoto(
            { imageUrl: result },
            {
              onSuccess: (response) => {
                setIsLoading(false);
                //TODO: Handle Uknown results
                router.push<any>({
                  pathname: '/search',
                  params: {
                    title: response?.result?.model ?? '',
                    brand: response?.result?.brand ?? '',
                    color: response?.result?.color ?? '',
                    referenceNumber: response?.result?.referenceNumber ?? '',
                    photo: photo && photo.uri,
                    total: 1256,
                    results: JSON.stringify(results),
                  },
                });
              },
              onError: () => {
                setIsLoading(false);
                showErrorMessage('Error handling search image');
              },
            }
          );
        } catch (error: any) {
          ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
        }
      } else {
        setIsLoading(false);
        showErrorMessage('File upload failed');
      }
    } catch (error) {
      setIsLoading(false);
      showErrorMessage('Error uploading image:');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor="#000"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={{ uri: photo?.uri }}
        style={{
          height: height,
          width: '100%',
        }}
      >
        {isLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#FC3F04" />
            <Text className="text-base font-semibold text-white ">
              Uploading...
            </Text>
          </View>
        )}
      </ImageBackground>
      <View style={styles.photoOptions}>
        <Pressable style={styles.photoOption} onPress={retakePicture}>
          <Text style={styles.photoOptionText}>Re-Take</Text>
        </Pressable>
        <Pressable style={styles.sendButton} onPress={sendImage}>
          <Text style={styles.sendText}>Send</Text>
          <Ionicons name="send-outline" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  photoOptions: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    marginBottom: '20%',
    justifyContent: 'space-around',
  },
  photoOption: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  photoOptionText: {
    fontSize: 17,
  },
  sendButton: {
    width: 110,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#17B169',
    flexDirection: 'row',
  },
  sendText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '400',
    marginRight: 10,
  },
});

export default CameraPreview;
