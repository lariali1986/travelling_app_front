import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { agentCreatePackage } from '../util/auth';
import { TouchableOpacity } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

const AgentCofirmPackageScreen = ({ route }) => {
  const [packageName, setPackageName] = useState('');
  const [daysCount, setDaysCount] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const navigation = useNavigation();
  const { responseBody, flights, hotels, activities } = route.params;
  //==remove the element 0==
  const flight = flights.filter((element) => element !== 0);
  const hotelList = hotels.filter((element) => element !== 0);
  const activityList = activities.filter((element) => element !== 0);

  console.log('this is activityList' + activityList);

  const handleCheckPackageDetails = () => {
    setShowDetail(true);
  };

  const handleBackToAgentPanel = () => {
    navigation.navigate('Agent Panel');
  };

  const handleConfirm = async () => {
    const response = await agentCreatePackage(
      flight,
      hotelList,
      activityList,
      packageName,
      parseInt(daysCount)
    );
    if (response.status == 200) {
      alert('the package was succesfully created');
    } else {
      alert('try again, something went wrong');
    }
    navigation.navigate('Agent Panel');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, {marginTop:100}]}
        value={packageName}
        onChangeText={setPackageName}
        placeholder='Package Name'
      />
      <TextInput
        style={styles.input}
        value={daysCount}
        onChangeText={setDaysCount}
        placeholder='Days Count'
        keyboardType='numeric'
      />
      <Button
        title='Check Package Details'
        onPress={handleCheckPackageDetails}
      />
      {showDetail && (
        <View>
          <Text>Package Name: {packageName} </Text>
          <Text>{daysCount} days</Text>
          <Text>Flight ID: {flight}</Text>
          <Text>Hotel IDs: {hotelList.join(',')}</Text>
          <Text>Activity IDs: {activityList.join(',')}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleBackToAgentPanel} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    marginLeft:5,
    backgroundColor: 'blue',
    borderRadius: 6,
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
};


export default AgentCofirmPackageScreen;
