import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList } from 'react-native';

import { Button, EmptyList, Select, Text, View } from '@/ui';

import { tailles } from './sign-up-form';

export interface ResultProductProps {
  results: {
    href: string;
    price: number;
  }[];
}

const ResultProductLinks: React.FC<ResultProductProps> = ({ results }) => {
  const [value, setValue] = React.useState<string | number | undefined>();

  const renderItem = React.useCallback(
    ({ item }: { item: { href: string; price: number } }) => {
      return (
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex items-center justify-center">
            <Text className="font-nhdmedium text-lg">{item.href}</Text>
            <Text className="font-plight text-base">{item.price} €</Text>
          </View>
          <View className="w-fit items-center justify-center">
            <Button
              className="h-14 w-fit items-center justify-center rounded-full text-lg"
              label="Voir l'offre"
              textClassName=""
              variant="ghost"
              onPress={() => {}}
            >
              <View className="relative overflow-hidden rounded-full">
                <LinearGradient
                  colors={['#FD521B', '#FF953D']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  shouldRasterizeIOS
                  className="flex-row items-center justify-center space-x-2 rounded-full px-4"
                >
                  <Text className="text-secondary mr-4 font-nhdmedium text-base text-white">
                    Voir l'offre
                  </Text>
                  <FontAwesome6
                    name="arrow-right-long"
                    size={18}
                    color="white"
                    className="py-3 pr-2"
                  />
                </LinearGradient>
              </View>
            </Button>
          </View>
        </View>
      );
    },
    []
  );

  return (
    <View className="flex-1">
      <View className="mb-4">
        <Select
          options={tailles}
          value={value}
          onSelect={(option) => setValue(option)}
        />
      </View>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
      />
    </View>
  );
};

export default ResultProductLinks;
