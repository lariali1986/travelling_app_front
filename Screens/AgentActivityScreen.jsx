import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AgentActivityCardGroup from '../Components/AgentActivityCardGroup';

//const predefinedPackages = require('../data/predefined_packages.json');
const AgentActivityScreen = ({ route }) => {
  const navigation = useNavigation();
  const { responseBody, flights, hotels } = route.params;

  let activityList = [];
  //===to get the selected activity from child componenet
  const selectedActivities = (activities) => {
    activityList = activities;
  };
  //==================================================
  const pressHandler = () => {
    navigation.navigate('Agent Confirm Package', {
      responseBody: responseBody,
      flights: flights,
      hotels: hotels,
      activities: activityList,
    });
  };

  const handleToFlightHotel = () => {
    navigation.navigate('Hotel');
  };

  return (
    <View style={styles.containerHome}>
      <AgentActivityCardGroup
        data={responseBody.activities}
        sendActivitiesToActivityScreen={selectedActivities}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleToFlightHotel}>
          <Text style={styles.buttonText}>Back to Flight/Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pressHandler}>
          <Text style={styles.buttonText}>Confirm Your Package</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  containerHome: {
    flex: 1,
    backgroundColor: 'lightyellow',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default AgentActivityScreen;
