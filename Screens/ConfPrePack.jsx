import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';
import HotelCardGroup from '../Components/HotelCardGroup';
import PackageCard from '../Components/PackageCard';
import { bookPackage } from '../util/auth';

const packages = require('../data/predefined_packages.json');

//const predefinedPackages = require('../data/predefined_packages.json');
const ConfPrePack = ({ route }) => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  //const [flightList, setFlightList]=useState();
  //const [packages, setPackages] = useState();
  const { packageInfo } = route.params;

  //if (route.name=='Confrim Package'){

  const backToHome = () => {
    navigation.navigate('Home');
  };

  const flightObj = packageInfo.flights;
  const hotelObj = packageInfo.hotels;
  const activityObj = packageInfo.activities;
  const changeDate=flightObj[0].departureTime;
  const departureDate = changeDate.split('T')[0];
  const dateObject = new Date(departureDate);
  dateObject.setDate(dateObject.getDate() + packageInfo.daysCount);

const returnDate = dateObject.toISOString().split('T')[0];
  

  //if (route.name=='Home')

  const openURL = (url) => {
    Linking.openURL(url).catch((error) =>
      console.error('Error opening URL:', error)
    );
  };

  const handlePayment = async () => {
    try {
      const response = await bookPackage(
        storedInfo.token,
        packageInfo.id,
        departureDate,
        returnDate,
        packageInfo.price
      );
      console.log(response);

      if (response.status == 200) {
        console.log('Hi');
        let jwtResponse = await response.json();

        console.log(JSON.stringify(jwtResponse));
        openURL(jwtResponse.url);
        console.log('...............' + jwtResponse.url);
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Details</Text>
        <Text>Flight Number: {flightObj[0].flightNumber}</Text>
        <Text>Departure Time: {flightObj[0].departureTime}</Text>
        <Text>From: {flightObj[0].departureCity}</Text>
        <Text>To: {flightObj[0].arrivalCity}</Text>
        <Text>Price: {flightObj[0].flightPrice}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotel Details</Text>
        <Text>Hotel Name: {hotelObj[0].hotelName}</Text>
        <Text>City: {hotelObj[0].cityName}</Text>
        <Text>Price Per Night: {hotelObj[0].pricePerNight}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Details</Text>
        <Text>Activity Name: {activityObj[0].activityName}</Text>
        <Text>Price: {activityObj[0].price} $</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Price: {packageInfo.price}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={backToHome}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Confirm and Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'violet',
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfPrePack;
