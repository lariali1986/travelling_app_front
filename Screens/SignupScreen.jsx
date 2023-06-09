import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { AsyncStorage } from 'react-native';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { signup } from '../util/auth';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';
import jwtDecode from 'jwt-decode';

class Customer {
  constructor() {
    this.name = '';
    this.username = '';
    this.email = '';
    this.password = '';
  }
  setCustomerName(name) {
    this.name = name;
  }
  setCustomerUsername(username) {
    this.username = username;
  }
  setCustomerEmail(email) {
    this.email = email;
  }
  setCustomerPassword(password) {
    this.password = password;
  }
}

const SignUpScreen = () => {
  const { storedInfo, setFcn } = useContext(AppContent);
  const navigation = useNavigation();
  const [confirmPassword, setConfirmPassword] = useState('');
  const newCustomer = new Customer();
  const [customer, setCustomer] = useState(newCustomer);

  const handleNameChange = (name) => {
    newCustomer.setCustomerName(name);
    setCustomer(newCustomer);
    console.log(JSON.stringify(customer));
  };

  const handleUsernameChange = (username) => {
    newCustomer.setCustomerUsername(username);
    setCustomer(newCustomer);
    console.log(JSON.stringify(customer));
  };

  const handleEmailChange = (email) => {
    newCustomer.setCustomerEmail(email);
    setCustomer(newCustomer);
    console.log(JSON.stringify(customer));
  };

  const handlePasswordChange = (password) => {
    newCustomer.setCustomerPassword(password);
    setCustomer(newCustomer);
    console.log(JSON.stringify(customer));
  };

  async function handleSignUp() {
    try {
      const response = await signup(
        customer.name,
        customer.username,
        customer.email,
        customer.password
      );
      if (response.status == 200) {
        let jwtResponse = await response.json();
        setFcn.setAuthToken(jwtResponse.api_token, jwtResponse.userName);
        setFcn.setTravelPackages(jwtResponse.packages);
        navigation.navigate('Home', { showHome: true });
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  }

  const handleBackToLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder='Name'
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder='userName'
        onChangeText={handleUsernameChange}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={handlePasswordChange}
      />

      <TextInput
        style={styles.input}
        placeholder='confirmPassword'
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleBackToLogin}>
        <Text style={styles.loginButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signUpButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 10,
  },
  loginButtonText: {
    color: 'blue',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  logo: {
    width: '100%',
    height: 360,
    marginRight: 2,
    marginBottom: 10,
  },
});

export default SignUpScreen;
