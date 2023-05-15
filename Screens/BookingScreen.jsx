import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function BookingScreen({ route, navigation }) {
  const [customerId, setCustomerId] = useState('');
  const [packageId, setPackageId] = useState('');

  const handleCustomerIdChange = (text) => {
    setCustomerId(text);
  };

  const handlePackageIdChange = (text) => {
    setPackageId(text);
  };

  const handleSubmit = () => {
    // code to submit the booking information
    console.log(`Customer ID: ${customerId}, Package ID: ${packageId}`);
  };
  console.log('the route is: ' + route);
  const { id } = route.params;

  //console.log(route.params)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Package ID: ' + id}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Customer ID"
          onChangeText={handleCustomerIdChange}
          value={customerId}
        />
        <TextInput
          style={styles.input}
          placeholder="Package ID"
          onChangeText={handlePackageIdChange}
          value={packageId}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});
