import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { AppContent } from '../store/AppContent';

class Customer {
  constructor() {
    this.customerId = '';
    this.name = '';
    this.lastName = '';
    this.dateOfBirth = '';
    this.email = '';
  }
  setId(id) {
    this.customerId = id;
  }
  setName(name) {
    this.name = name;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setDateOfBirth(birthDate) {
    this.dateOfBirth = birthDate;
  }

  setEmail(email) {
    this.email = email;
  }
}

const CustomerScreen = () => {
  const { setFcn, storedInfo } = useContext(AppContent);
  const newCustomer = new Customer();
  const [customer, setCustomer] = useState(newCustomer);

  const handleNameChange = (name) => {
    newCustomer.setName(name);
    setCustomer(newCustomer);
  };

  const handleLastNameChange = (lastName) => {
    newCustomer.setLastName(lastName);
    setCustomer(newCustomer);
  };

  const handleDateOfBirthChange = (birthDate) => {
    newCustomer.setDateOfBirth(birthDate);
    setCustomer(newCustomer);
  };

  const handleEmailChange = (email) => {
    newCustomer.setEmail(email);
    setCustomer(newCustomer);
  };

  const handleSubmit = () => {
    setFcn.updateCustomerList([{ name: newCustomer.name}]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={handleLastNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        onChangeText={handleDateOfBirthChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default CustomerScreen;
