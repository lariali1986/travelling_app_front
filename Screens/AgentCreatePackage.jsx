import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAvailableFHA } from '../util/auth';
import { AppContent } from '../store/AppContent';

const AgentCreatePackage = () => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleLeavingFromChange = (text) => {
    setLeavingFrom(text);
  };

  const handleGoingToChange = (text) => {
    setGoingTo(text);
  };

  const handleDepartureDateChange = (text) => {
    setDepartureDate(text);
  };

  const handleReturnDateChange = (text) => {
    setReturnDate(text);
  };

  const handleSubmit = async () => {
    try {
      const response = await getAvailableFHA(
        leavingFrom,
        goingTo,
        departureDate,
        returnDate
      );
      if (response.status == 200) {
        //console.log('this is the info receiced........');
        let responseBody = await response.json();
        //console.log('.......' + JSON.stringify(jwtResponse));
        navigation.navigate('Agent Flight', {responseBody: responseBody});
       // navigation.navigate('Agent Panel', {responseBody: responseBody, Btn: 'Flight' });
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Locations:</Text>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Leaving From:</Text>
          <TextInput
            value={leavingFrom}
            onChangeText={handleLeavingFromChange}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Going To:</Text>
          <TextInput
            value={goingTo}
            onChangeText={handleGoingToChange}
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.heading}>Select Dates:</Text>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Departure Date:</Text>
          <TextInput
            value={departureDate}
            onChangeText={handleDepartureDateChange}
            style={styles.input}
            placeholder='YYYY-MM-DD'
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Return Date:</Text>
          <TextInput
            value={returnDate}
            onChangeText={handleReturnDateChange}
            style={styles.input}
            placeholder='YYYY-MM-DD'
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title='Submit' onPress={handleSubmit} />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 30,
    fontSize: 16,
    paddingHorizontal: 2,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AgentCreatePackage;
