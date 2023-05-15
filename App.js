import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import CustomerScreen from './Screens/CustomerScreen';
import PackageScreen from './Screens/PackageScreen';
import AgentScreen from './Screens/AgentScreen';
import BookingScreen from './Screens/BookingScreen';
import AppContentProvider from './store/AppContent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppContentProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'HOME' }}
          />
          <Stack.Screen
            name="Customer"
            component={CustomerScreen}
            options={{ title: 'Customer Info' }}
          />
          <Stack.Screen
            name="Package"
            component={PackageScreen}
            options={{ title: 'Package Info' }}
          />

          <Stack.Screen
            name="Agent"
            component={AgentScreen}
            options={{ title: 'Agent Workplace' }}
          />

          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{ title: 'Final Booking' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContentProvider>
  );
}

/*
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContentProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'HOME' }}
          />
          <Stack.Screen name="Agent" component={AgentScreen} />
          <Stack.Screen name="Customer" component={CustomerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContentProvider>
  );
}
*/
