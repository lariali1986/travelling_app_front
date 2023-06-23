import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';


const SignUpScreen = () => {
  const { storedInfo, setFcn, systemClasses } = useContext(AppContent);
  const navigation = useNavigation();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName]=useState();
  const [password, setPassword]=useState();
  const [email, setEmail]=useState();
  const [username, setUsername]=useState();

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  async function handleSignUp() {
    const validityStatus = checkCredentials(
      username,
      email,
      password,
      confirmPassword
    );
    if (validityStatus.isValid) {
      try {
        const response = await customer.signUp(
          name,
          username,
          email,
          password
        );
        if (response.status == 200) {
          let jwtResponse = await response.json();
          setFcn.setTheCustomer(customer);
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
    } else {
      alert(validityStatus.message);
    }
  }

  const handleBackToLogin = () => {
    navigation.navigate('Home');
  };
  const handleConfirmPass = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
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
        value={confirmPassword}
        onChangeText={handleConfirmPass}
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

function checkCredentials(username, email, password, confirmPassword) {

  console.log('...'+!!password || !!email || !!password || !!confirmPassword);
  if (!password || !email || !password || !confirmPassword) {
    console.log('Hi')
    return {
      isValid: false,
      message: 'Please Fill in all the entries',
    };
  }


  if (!!username && username.length < 8) {
    return {
      isValid: false,
      message: 'Username should be at least 8 characters long.',
    };
  }

  if (!!email && !email.includes('@')) {
    return {
      isValid: false,
      message: 'Email should include the @ symbol.',
    };
  }

  if (!!password && password.length < 8) {
    return {
      isValid: false,
      message: 'Password should be at least 8 characters long.',
    };
  }

  if (!!password && !!confirmPassword && password !== confirmPassword) {
    return {
      isValid: false,
      message: 'Password and confirm password do not match.',
    };
  }

  return {
    isValid: true,
    message: 'Credentials are correct.',
  };
}

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
