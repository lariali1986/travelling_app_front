import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';
import ActivityCardGroup from '../Components/ActivityCardGroup'


//const predefinedPackages = require('../data/predefined_packages.json');
const ActivityScreen = ({ route }) => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  //const [flightList, setFlightList]=useState();
  //const [packages, setPackages] = useState();
  const { responseBody } = route.params;

  console.log(
    'I am inside the flightList anhe flights are ' +
      JSON.stringify(responseBody.flights[0])
  );
  const pressHandler = () => {
      navigation.navigate('Confirm Package', { responseBody: responseBody });
  };

  const handleToFlightHotel = () => {
      navigation.navigate('Hotel', { responseBody: responseBody});
    };


  return (
    <View style={styles.containerHome}>
      <ActivityCardGroup data={responseBody.activities} />
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

export default ActivityScreen;
