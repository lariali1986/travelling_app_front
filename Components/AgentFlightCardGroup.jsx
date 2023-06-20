import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AgentFlightCard from './AgentFlightCard';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';


export default function AgentFlightCardGroup({ data }) {
  const navigation = useNavigation();
  const {storedInfo, setFcn}=useContext(AppContent);
  //const [activeFlight, setActiveFlight]=useContext();
  
  console.log('my type is: ', navigation);
  //const image1 = require('../assets/icon.png');

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={1}
      renderItem={({ item}) => (
        <AgentFlightCard
          item={item} active={storedInfo.flightID}
          
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
