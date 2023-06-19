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
import { createPackage } from '../util/auth';

const packages = require('../data/predefined_packages.json');

//const predefinedPackages = require('../data/predefined_packages.json');
const ConfirmPackage = ({ route }) => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  //const [flightList, setFlightList]=useState();
  //const [packages, setPackages] = useState();
  const { responseBody } = route.params;

  //if (route.name=='Confrim Package'){

  const backToHome = () => {
    navigation.navigate('Home');
  };

  console.log('I am in activity');
  const flight = responseBody.flights;
  const hotel = responseBody.hotels;
  const activity = responseBody.activities;
  const flightObj = flight.filter((item) => item.id === storedInfo.flightID[0]);
  console.log('..............' + JSON.stringify(flightObj));
  const hotelObj = hotel.filter((item) => storedInfo.hotelID.includes(item.id));
  const activityObj = activity.filter((item) =>
    storedInfo.activityID.includes(item.id)
  );
  
  let hotelPrice = hotelObj.map(hotel => hotel.pricePerNight)
  let activityPrice = activityObj.map(activity => activity.price)
  console.log('...........'+JSON.stringify(flightObj))
  console.log(JSON.stringify(hotelObj));
  console.log(JSON.stringify(activityObj))

  //if (route.name=='Home')

  const openURL = (url) => {
    Linking.openURL(url).catch((error) =>
      console.error('Error opening URL:', error)
    );
  };

  const handlePayment = async () => {
    try {
      const response = await createPackage(
        storedInfo.token,
        storedInfo.flightID[0],
        storedInfo.hotelID,
        storedInfo.activityID,
        storedInfo.check_in_date,
        storedInfo.check_out_date,
        flightObj[0].flightPrice,
        hotelPrice,
        activityPrice,
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

  console.log(storedInfo.flight);
  console.log(storedInfo.hotel);
  console.log(storedInfo.activity);

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

        {hotelObj.map((hotel, index) => (
          <View key={index}>
            <Text style={styles.sectionSubTitle}>Hotel {index+1}:</Text>
            <Text>Hotel Name: {hotel.hotelName}</Text>
            <Text>City: {hotel.cityName}</Text>
            <Text>Price Per Night: {hotel.pricePerNight}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Details</Text>
        {activityObj.map((activity, index) => (
          <View key={index}>
            <Text style={styles.sectionSubTitle}>Activity {index+1}:</Text>
            <Text>Activity Name: {activity.activityName}</Text>
            <Text>Price: {activity.price} $</Text>
          </View>
        ))}
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

export default ConfirmPackage;
