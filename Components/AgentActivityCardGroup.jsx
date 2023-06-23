import React, {useState} from 'react';
import { FlatList } from 'react-native';
import AgentActivityCard from './AgentActivityCard';

export default function AgentActivityCardGroup({ data, sendActivitiesToActivityScreen }) {
  const [selectedActivities, setSelectedActivities]=useState([0]);

  sendActivitiesToActivityScreen(selectedActivities)
  
  const getSelectedActivities=(element, action)=>{
    if (action=='add'){
      setSelectedActivities([...selectedActivities, element]);
    }
    else if (action=='rmv'){
      setSelectedActivities(selectedActivities.filter((item) => item !== element));
    }
  }

  let active=selectedActivities;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={1}
      renderItem={({ item}) => (
        <AgentActivityCard
          item={item} active={active} sendSelectedToParent={getSelectedActivities}
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

