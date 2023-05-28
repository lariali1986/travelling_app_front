import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const CustomPackage = () => {
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

  const handleSubmit = () => {
    // Handle the submission of the form
    console.log('Submitted data:', {
      leavingFrom: leavingFrom,
      goingTo: goingTo,
      departureDate: departureDate,
      returnDate: returnDate,
    });
    // Perform any additional actions with the form data as needed
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
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
            placeholder='DD/MM/YY'
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Return Date:</Text>
          <TextInput
            value={returnDate}
            onChangeText={handleReturnDateChange}
            style={styles.input}
            placeholder='DD/MM/YY'
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
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: '100%',
    height: 360,
    marginRight: 2,
    marginBottom: 10,
  },
});

export default CustomPackage;
