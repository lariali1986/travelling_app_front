import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AgentHotelCardGroup from '../Components/AgentHotelCardGroup';

const AgentHotelScreen = ({ route }) => {
  const navigation = useNavigation();
  const { responseBody, flights } = route.params;

  let hotelList=[];

  //===to get the selected flight from child componenet
  const selectedHotels=(hotel)=>{
    hotelList=hotel;
  }
  //==================================================

  const handleToActivityPage = () => {
    if (hotelList.length < 2) {
      alert('At least one item should be selected');
    } else {
      navigation.navigate('Agent Activity', { responseBody: responseBody, flights:flights, hotels:hotelList});
    }
  };

  const handleToFlightPage = () => {
      navigation.navigate('Agent Flight');
    
  };

  return (
    <View style={styles.containerHome}>
      <AgentHotelCardGroup data={responseBody.hotels} sendHotelsToHotelScreen={selectedHotels}/>
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

export default AgentHotelScreen;
