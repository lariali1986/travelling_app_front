import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';

const UserProfileScreen = () => {
  const { storedInfo, setFcn, systemClasses } = useContext(AppContent);
  return (
    <View style={styles.container}>
      <View style={styles.userAccount}>
        <Text style={styles.label}>User Name:</Text>
        <Text style={styles.value}>{storedInfo.customerUsername}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>johndoe@example.com</Text>
      </View>

      <View style={styles.createdPackages}>
        <Text style={styles.sectionTitle}>Created Packages</Text>
        {/* Render your created packages here */}
      </View>

      <View style={styles.bookings}>
        <Text style={styles.sectionTitle}>Bookings</Text>
        {/* Render your bookings here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  userAccount: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  createdPackages: {
    marginBottom: 20,
  },
  bookings: {},
});

export default UserProfileScreen;
