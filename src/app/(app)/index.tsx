/* eslint-disable max-lines-per-function */
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { products } from '@/api/products';
import type { Product } from '@/components/product-card';
import ProductCard from '@/components/product-card';
import { EmptyList, FocusAwareStatusBar, Image, Text } from '@/ui';
import { AlwaysOpenModal, useAlwaysOpenModal } from '@/ui/always-open-modal';
import images from '@/ui/images/images';

const { width } = Dimensions.get('window');

export default function Home() {
  const { ref, present } = useAlwaysOpenModal();
  const router = useRouter();

  const renderItem = React.useCallback(({ item }: { item: Product }) => {
    return (
      <View style={styles.itemContainer}>
        <ProductCard brand={item.brand} name={item.name} image={item.image} />
      </View>
    );
  }, []);

  React.useEffect(() => {
    present();
  }, [present, ref]);

  return (
    <View className="flex-1">
      <FocusAwareStatusBar barStyle={'light-content'} />
      <LinearGradient
        colors={[
          '#FD521B',
          '#FD521B',
          '#FF953D',
          '#FF953D',
          '#FD521B',
          '#FD521B',
          '#FF953D',
        ]}
        style={styles.background}
      >
        <View className="h-full w-full items-center justify-center gap-4">
          <View className="items-center justify-center gap-4">
            <Text className="mt-4 font-psemibold text-lg text-white">
              Scan pour identifier ta sneaker
            </Text>
            <Pressable onPress={() => router.push('/camera')}>
              <Image
                source={images.logo}
                style={styles.logo}
                contentFit="cover"
              />
            </Pressable>
          </View>
          <Pressable onPress={() => router.push('/camera')}>
            <Image
              source={images.camera}
              style={styles.camera}
              contentFit="cover"
            />
          </Pressable>
        </View>
        <View className="w-full flex-1">
          <AlwaysOpenModal
            snapPoints={['3%', '95%']} // optional
            title="Mes scans"
            skaners={18}
            ref={ref}
            enablePanDownToClose={false}
          >
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={(_, index) => `item-${index}`}
              ListEmptyComponent={<EmptyList isLoading={false} />}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          </AlwaysOpenModal>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 5,
    maxWidth: width / 2 - 15, // To account for margins and padding
  },
  logo: {
    height: 96, // Tailwind's h-24 translates to 96 pixels
    width: 96, // Tailwind's w-24 translates to 96 pixels
    marginTop: 20,
  },
  camera: {
    height: 28, // Tailwind's h-6 translates to 28 pixels
    width: 28, // Tailwind's w-6 translates to 28 pixels
    marginTop: 20,
  },
});
