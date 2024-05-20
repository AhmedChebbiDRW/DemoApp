import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Partner } from '@/api/partners';
import { usePartners } from '@/api/partners';
import { PartnerCard } from '@/components/partner-card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

export default function Partners() {
  const { data, isPending, isError } = usePartners();
  const renderItem = React.useCallback(
    ({ item }: { item: Partner }) => <PartnerCard {...item} />,
    []
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      />
    </View>
  );
}
