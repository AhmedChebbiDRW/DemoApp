import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import ResultProductCard from '@/components/result-product-card';
import ResultProductLinks from '@/components/result-product-links';
import { useAlwaysOpenModal } from '@/core/modal/use-always-open-modal';
import { View } from '@/ui';

export default function Search() {
  const searchParams = useLocalSearchParams();
  const { dismiss, ref } = useAlwaysOpenModal();

  const { title, brand, color, referenceNumber, photo, total, results } =
    searchParams;
  const r = JSON.parse(results as string);

  React.useEffect(() => {
    dismiss();
  }, [dismiss, ref]);

  return (
    <View className="flex-1 flex-col">
      <View className="flex-1">
        <ResultProductCard
          image={photo as string}
          brand={brand as string}
          name={title as string}
          total={total as string}
          color={color as string}
          referenceNumber={referenceNumber as string}
        />
      </View>
      <View className="flex-1 p-4">
        <ResultProductLinks results={r} />
      </View>
    </View>
  );
}
