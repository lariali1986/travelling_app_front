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
import HotelCardGroup from '../Components/HotelCardGroup';

const packages = require('../data/predefined_packages.json');

//const predefinedPackages = require('../data/predefined_packages.json');
const HotelScreen = ({ route }) => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  //const [flightList, setFlightList]=useState();
  //const [packages, setPackages] = useState();
  const { responseBody } = route.params;

  console.log(
    'I am inside the flightList anhe flights are ' +
      JSON.stringify(responseBody.flights[0])
  );
  const handleToActivityPage = () => {
    if (storedInfo.hotelID.length < 1) {
      alert('At least one item should be selected');
    } else {
      navigation.navigate('Activity', { responseBody: responseBody });
    }
  };

  const handleToFlightPage = () => {
      navigation.navigate('Flight', { responseBody: responseBody });
    
  };

  return (
    <View style={styles.containerHome}>
      <HotelCardGroup data={responseBody.hotels} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleToFlightPage}>
          <Text style={styles.buttonText}>Back to Select Flight</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleToActivityPage}>
          <Text style={styles.buttonText}>Next to Select Activity</Text>
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
    paddingHorizontal: 6,
    paddingVertical: 6,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
};

export default HotelScreen;
