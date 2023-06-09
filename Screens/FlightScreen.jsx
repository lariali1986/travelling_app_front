import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import PackageCardGroup from '../Components/PackageCardGroup';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';
import { getPackages } from '../util/auth';
import FlightCardGroup from '../Components/FlightCardGroup';

const packages = require('../data/predefined_packages.json');

//const predefinedPackages = require('../data/predefined_packages.json');
const FlightScreen = ({ route }) => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  //const [flightList, setFlightList]=useState();
  //const [packages, setPackages] = useState();
  const { responseBody } = route.params;

  console.log(
    'I am inside the flightList anhe flights are ' +
      JSON.stringify(responseBody)
  );
  const pressHandler = () => {
    if (storedInfo.flightID.length > 1) {
      alert('Please Select Just One Item');
    } else if (storedInfo.flightID.length < 1) {
      alert('At least one item should be selected');
    } else {
      navigation.navigate('Hotel', { responseBody: responseBody });
    }
  };

  return (
    <View style={styles.containerHome}>
      <FlightCardGroup data={responseBody.flights} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pressHandler}>
          <Text style={styles.buttonText}>Next to Select Hotel</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default FlightScreen;
