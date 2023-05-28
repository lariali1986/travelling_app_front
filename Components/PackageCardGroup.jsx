import React from 'react';
import { FlatList } from 'react-native';
import PackageCard from './PackageCard';
import { useNavigation } from '@react-navigation/native';

export default function PackageCardGroup({ data }) {
  const navigation = useNavigation();
  console.log('my type is: ', navigation);
  //const image1 = require('../assets/icon.png');

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={1}
      renderItem={({ item }) => (
        <PackageCard
          item={item}
          
        />
      )}
      contentContainerStyle={styles.cardGroup}
    />
  );
}

const styles = {
  cardGroup: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
};
