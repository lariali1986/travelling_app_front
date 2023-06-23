import React, {useState} from 'react';
import { FlatList } from 'react-native';
import AgentHotelCard from './AgentHotelCard';

export default function AgentHotelCardGroup({ data, sendHotelsToHotelScreen }) {
  const [selectedHotels, setSelectedHotels] = useState([0]);

  sendHotelsToHotelScreen(selectedHotels);
  console.log("this is selected hotels"+selectedHotels)

  const getSelectedHotels = (element, action) => {
    if (action == 'add') {
      setSelectedHotels([...selectedHotels, element]);
    } else if (action == 'rmv') {
      setSelectedHotels(selectedHotels.filter((item) => item !== element));
    }
  };

  let active = selectedHotels;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={1}
      renderItem={({ item }) => (
        <AgentHotelCard
          item={item}
          active={active}
          sendSelectedToParent={getSelectedHotels}
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
