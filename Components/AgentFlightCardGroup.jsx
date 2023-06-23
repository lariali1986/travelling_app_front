import React, {useState} from 'react';
import { FlatList } from 'react-native';
import AgentFlightCard from './AgentFlightCard';

export default function AgentFlightCardGroup({ data, sendFlightsToFlightScreen }) {
  const [selectedFligths, setSelectedFlights]=useState([0]);

  sendFlightsToFlightScreen
  const sendFlights=()=>{
    sendFlightsToFlightScreen(selectedFligths);
  }
  sendFlights();

  const getSelectedFlights=(element, action)=>{
    if (action=='add'){
      setSelectedFlights([...selectedFligths, element]);
    }
    else if (action=='rmv'){
      setSelectedFlights(selectedFligths.filter((item) => item !== element));
    }
  }

  let active=selectedFligths;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={1}
      renderItem={({ item}) => (
        <AgentFlightCard
          item={item} active={active} sendSelectedToParent={getSelectedFlights}
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
