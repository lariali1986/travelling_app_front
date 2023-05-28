import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import AppContentProvider from './store/AppContent';
import SignUpScreen from './Screens/SignupScreen';
import LoginScreen from './Components/LoginScreen';
import FlightBookingScreen from './Screens/FlightBookingScreen';
import CustomPackage from './Screens/CustomPackage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppContentProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ title: 'Login' }}
          />

          <Stack.Screen
            name='Flight Booking'
            component={FlightBookingScreen}
            options={{ title: 'Flight Booking' }}
          />

          <Stack.Screen
            name='Sign Up'
            component={SignUpScreen}
            options={{ title: 'Sign Up' }}
          />

          <Stack.Screen
            name='Custom Package'
            component={CustomPackage}
            options={{ title: 'Create Custom Packge' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContentProvider>
  );
}
