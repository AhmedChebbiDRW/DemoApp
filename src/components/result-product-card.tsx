import React from 'react';
import { ImageBackground } from 'react-native';

import { Text, View } from '@/ui';
import { Favorite } from '@/ui/icons/favorite';
import { Info } from '@/ui/icons/info';

export interface ResultProductProps {
  image: string;
  brand: string;
  name: string;
  total: string;
  color: string;
  referenceNumber: string;
}

const ResultProductCard: React.FC<ResultProductProps> = ({
  image,
  brand,
  name,
  total,
  color,
  referenceNumber,
}) => {
  return (
    <View className="text-surface shadow-secondary-1 dark:bg-surface-dark h-full w-full rounded-lg bg-white py-4 dark:bg-gray-900 dark:text-white">
      <View className="relative h-full w-full overflow-hidden bg-contain bg-no-repeat">
        <ImageBackground
          source={{ uri: image }}
          resizeMode="cover"
          className="h-fit w-full"
        >
          <View className="absolute right-6 top-16">
            <Favorite
              color="black"
              fill="rgba(100, 100, 100, 0.7)"
              width={35}
              height={35}
            />
          </View>
          <View className={`mt-20 p-4`}>
            <Text className={`font-nhdmedium text-2xl text-white`}>{name}</Text>
            <Text className={`font-pmedium text-lg text-white`}>{brand}</Text>
            <Text className={`font-pmedium text-lg text-white`}>{color}</Text>
            <Text className={`font-pmedium text-lg text-white`}>
              {referenceNumber}
            </Text>
            <View className="flex flex-row">
              <Info />
              <Text className={`font-pmedium text-lg text-white`}>
                {total} skaners 🔥
              </Text>
            </View>
          </View>
          <View className={`h-full w-full p-4`}>
            <Text className={`truncate font-plight text-sm text-white`}>
              La YEEZY BOOST 350 V2 est une sneaker embl&eacute;matique qui
              repr&eacute;sente une collaboration entre le c&eacute;l&egrave;bre
              rappeur et designer Kanye West et la marque de sport Adidas. Cette
              chaussure a marqu&eacute; l'industrie de la mode et des sneakers
              par son design innovant, sa technologie de pointe et son impact
              culturel significatif. Voici un aper&ccedil;u de son histoire et
              de son d&eacute;veloppement.
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ResultProductCard;
