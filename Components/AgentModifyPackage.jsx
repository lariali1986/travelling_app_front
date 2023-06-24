import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { agentModifyPackage } from '../util/auth';
import { AppContent } from '../store/AppContent';
import { TouchableOpacity } from 'react-native-web';

const AgentModifyPackage = () => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  const [packageId, setPackageId] = useState('');
  const [packageName, setPackageName] = useState('');
  const [daysCount, setDaysCount] = useState('');
  const [flightIDs, setFlightIDs] = useState('');
  const [hotelIDs, setHotelIDs] = useState('');
  const [activityIDs, setActivityIDs] = useState('');

  const handlePackageId = (packageId) => {
    setPackageId(packageId);
  };

  const handlePackagaeName = (packageName) => {
    setPackageName(packageName);
  };

  const handleDaysCount = (daysCount) => {
    setDaysCount(daysCount);
  };

  const handleFlightId = (flightId) => {
    setFlightIDs(flightId);
  };

  const handleHotelId = (hotelId) => {
    setHotelIDs(hotelId);
  };
  const handleActivityId = (activityId) => {
    setActivityIDs(activityId);
  };

  //===============Modify Package=================
  const handleModifyPackage = async () => {
    try {
      let hotelArray=hotelIDs.split(',').map(Number);
      let activityArray=activityIDs.split(',').map(Number);
      const response = await agentModifyPackage(parseInt(packageId), packageName, parseInt(daysCount), [parseInt(flightIDs)], hotelArray, activityArray);
      if (response.status == 200) {
        console.log('I am here........');
        let jwtResponse = await response.json();
        console.log(JSON.stringify(jwtResponse));
        alert('successfully updated');
      }
      if (response.status != 200) {
        alert('There is an error, please try again');
      }
    } catch (error) {
      alert(error);
    }
  };

  //============================================

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Updated Package Info</Text>
      <TextInput
        value={packageId}
        placeholder='Package ID'
        onChangeText={handlePackageId}
        style={styles.input}
      />
      <TextInput
        value={packageName}
        placeholder='Package Name'
        onChangeText={handlePackagaeName}
        style={styles.input}
      />
      <TextInput
        value={daysCount}
        placeholder='Number of Days'
        onChangeText={handleDaysCount}
        style={styles.input}
      />
      <TextInput
        value={flightIDs}
        placeholder='Flight ID'
        onChangeText={handleFlightId}
        style={styles.input}
      />
      <TextInput
        value={hotelIDs}
        placeholder='Hotel IDs'
        onChangeText={handleHotelId}
        style={styles.input}
      />
      <TextInput
        value={activityIDs}
        placeholder='Activity IDs'
        onChangeText={handleActivityId}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleModifyPackage} style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
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
    height: 30,
    fontSize: 12,
    paddingHorizontal: 2,
    borderColor: 'black',
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom:8,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'blue',
  },
  buttonText:{
    color: 'white'
  }
});

export default AgentModifyPackage;
