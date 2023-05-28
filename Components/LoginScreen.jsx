import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';
import { login } from '../util/auth';
import { AppContent } from '../store/AppContent';

const LoginScreen = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  
  
  const AgentOrCustomerHandler = () => {
    setIsCustomer(!isCustomer)
  };

  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  async function handleLogin(){
    try {
      const response = await login(username, password);
      if (response.status == 200) {
       
        let jwtResponse = await response.json();
        setFcn.setAuthToken(jwtResponse.api_token);
        setFcn.setTravelPackages(jwtResponse.packages)
        console.log("this is packages in login response: ", jwtResponse);
        console.log("this is status in login: ", response.status);
        navigation.navigate('Home', {showHome: true});
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {isCustomer && <Text style={styles.simpleText}>Login as a customer</Text>}
        {!isCustomer && <Text style={styles.simpleText}>Login as an agent</Text>}
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
         {isCustomer && <Text style={styles.signUpText}>Don't have an account? Sign up</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={AgentOrCustomerHandler}>
          {isCustomer && <Text style={styles.signUpText}>Are you an agent? Login</Text>}
          {!isCustomer && <Text style={styles.signUpText}>Are you a customer? Login</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
    marginTop: 100,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '60%',
    height: 25,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 10,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 1,
    marginTop: 5,
  },
  buttonText: {
    color: '',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButton: {
    marginTop: 5,
    textAlign: 'center',
  },
  signUpText: {
    color: '#000000',
    fontSize: 10,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  simpleText: {
    color: '#000000',
    fontSize: 12,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
