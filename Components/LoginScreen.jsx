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
import { login, agentLogin } from '../util/auth';
import { AppContent } from '../store/AppContent';

const LoginScreen = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);

  const AgentOrCustomerHandler = () => {
    setIsCustomer(!isCustomer);
  };
  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  async function handleLogin() {
    if (isCustomer) {
      try {
        const response = await login(username, password);
        if (response.status === 200) {
          
          let jwtResponse = await response.json();
          console.log(jwtResponse);
          if (jwtResponse.status=='success') {
            setFcn.setAuthToken(jwtResponse.api_token, jwtResponse.userName);
            setFcn.setTravelPackages(jwtResponse.packages);
            navigation.navigate('Home', { showHome: true });
          } else {
            alert(jwtResponse.status);
          }
        }
      } catch (error) {
        alert(error);
      }
    } else if (!isCustomer) {
      try {
        const response = await agentLogin(username, password);
        if (response.status === 200) {
          let jwtResponse = await response.json();
          console.log(JSON.stringify('............'+jwtResponse))
          if (jwtResponse.status !== 'No Such User') {
            console.log("................agett ......", jwtResponse.userName);
            setFcn.setAuthAgentToken(jwtResponse.api_token, jwtResponse.userName);
            //
            //console.log('this is jwtResponse in login: ', jwtResponse.status);
            navigation.navigate('Agent Panel');
          } else {
            alert(jwtResponse.status);
          }
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <View>
      <View style={styles.container}>
        {isCustomer && (
          <Text style={styles.simpleText}>Login as a customer</Text>
        )}
        {!isCustomer && (
          <Text style={styles.simpleText}>Login as an agent</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder='username'
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          {isCustomer && (
            <Text style={styles.signUpText}>
              Don't have an account? Sign up
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={AgentOrCustomerHandler}
        >
          {isCustomer && (
            <Text style={styles.signUpText}>Are you an agent? Login</Text>
          )}
          {!isCustomer && (
            <Text style={styles.signUpText}>Are you a customer? Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
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
    height: 35,
    borderColor: 'yellow',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    color:'white',
  },
  loginButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 1,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
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
    fontSize: 12,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  simpleText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
