import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import ResultProductCard from '@/components/result-product-card';
import ResultProductLinks from '@/components/result-product-links';
import { View } from '@/ui';

export default function Search() {
  const searchParams = useLocalSearchParams();
  const { title, brand, photo, total, results } = searchParams;
  const r = JSON.parse(results as string);
  return (
    <View className="flex-1 flex-col">
      <View className="flex-1">
        <ResultProductCard
          image={photo as string}
          brand={brand as string}
          name={title as string}
          total={total as string}
        />
      </View>
      <View className="flex-1 p-4">
        <ResultProductLinks results={r} />
      </View>
    </View>
  );
}
