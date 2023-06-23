import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AgentFlightCardGroup from '../Components/AgentFlightCardGroup';

const AgentFlightScreen = ({ route }) => {

  const navigation = useNavigation();
  let flightList=[];

  //===to get the selected flight from child componenet
  const selectedFlights=(flight)=>{
    flightList=flight;
  }
  //==================================================
 
  const { responseBody } = route.params;

  //=========Condition on the number of flights=======
  const pressHandler = () => {
    if (flightList.length > 2) {
      alert('Please Select Just One Item');
    } else if (flightList.length < 2) {
      alert('At least one item should be selected');
    } else {
      navigation.navigate('Agent Hotel', { responseBody: responseBody, flights: flightList});
    }
  };
//=======================================================
 
  return (
    <View style={styles.containerHome}>
      <AgentFlightCardGroup data={responseBody.flights} sendFlightsToFlightScreen={selectedFlights}/>
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

export default AgentFlightScreen;
