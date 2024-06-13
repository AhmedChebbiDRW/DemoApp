import React from 'react';

import { Image, Text, View } from '@/ui';
import { Favorite } from '@/ui/icons/favorite';

export interface Product {
  image: string;
  brand: string;
  name: string;
}

const ProductCard: React.FC<Product> = ({ image, brand, name }) => {
  return (
    <View className="text-surface shadow-secondary-1 dark:bg-surface-dark rounded-lg bg-white dark:text-white">
      <View className="relative overflow-hidden bg-cover bg-no-repeat">
        <Image
          className="h-56 w-full overflow-hidden rounded-t-xl"
          contentFit="cover"
          source={{
            uri: image,
          }}
        />
        <View className="absolute right-3 top-6">
          <Favorite color="white" width={25} height={25} />
        </View>
      </View>
      <View className={`p-6`}>
        <Text className={`font-pregular`}>{brand}</Text>
        <Text className={`font-nhdmedium text-lg`}>{name}</Text>
      </View>
    </View>
  );
};

export default ProductCard;