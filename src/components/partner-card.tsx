import { Link } from 'expo-router';
import * as React from 'react';

import type { Partner } from '@/api/partners';
import { Image, Pressable, Text, View } from '@/ui';

type Props = Partner;
export const PartnerCard = ({ id, image, title, description }: Props) => {
  return (
    <Link href={`/feed/${id}`} asChild>
      <Pressable>
        <View className="m-2 overflow-hidden rounded-xl  border border-neutral-300 bg-white  dark:bg-neutral-900">
          <Image
            className="h-56 w-full overflow-hidden rounded-t-xl"
            contentFit="cover"
            source={{
              uri: image,
            }}
          />

          <View className="p-2">
            <Text className="py-3 text-2xl ">{title}</Text>
            <Text numberOfLines={3} className="leading-snug text-gray-600">
              {description}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
