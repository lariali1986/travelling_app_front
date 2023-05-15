import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { AppContent } from '../store/AppContent';

class TravelPackage {
  constructor() {
    this.packageId = '';
    this.destinationCity = '';
    this.destinationCountry = '';
    this.numberOfDays = 0;
    this.numberOfNights = 0;
  }

  setDestinationCity(city) {
    this.destinationCity = city;
  }

  setDestinationCountry(country) {
    this.destinationCountry = country;
  }

  setNumberOfDays(days) {
    this.numberOfDays = days;
  }

  setNumberOfNights(nights) {
    this.numberOfNights = nights;
  }
}

const predefinedPackages = require('../data/predefined_packages.json');
const PackageScreen = () => {
  const navigation = useNavigation();
  const newTravelPackage = new TravelPackage();
  const [travelPackage, setTravelPackage] = useState(newTravelPackage);
  const { setFcn, storedInfo } = useContext(AppContent);

  const handleDestinationCityChange = (city) => {
    newTravelPackage.setDestinationCity(city);
    setTravelPackage(newTravelPackage);
  };

  const handleDestinationCountryChange = (country) => {
    newTravelPackage.setDestinationCountry(country);
    setTravelPackage(newTravelPackage);
  };

  const handleNumberOfDaysChange = (days) => {
    newTravelPackage.setNumberOfDays(parseInt(days));
    setTravelPackage(newTravelPackage);
  };

  const handleNumberOfNightsChange = (nights) => {
    newTravelPackage.setNumberOfNights(parseInt(nights));
    setTravelPackage(newTravelPackage);
  };

  const packInfo = () => {
    return [
      {
        id: travelPackage.id,
        destinationCity: travelPackage.destinationCity,
        destinationCity: travelPackage.destinationCountry,
        numberOfDays: travelPackage.numberOfDays,
        numberOfNights: travelPackage.numberOfNights,
      },
    ];
  };
  //       , hotelName: travelPackage.hotelName,
  //         price: travelPackage.price}]
  // }

  const handleSubmit = () => {
    //setTravelPackage(travelPackage)
    console.log(travelPackage);
    console.log('this is travel package' + packInfo(travelPackage));
    console.log(storedInfo.data);
    setFcn.updateData([
      { destinationCity: travelPackage.destinationCity, destinationCountry: travelPackage.destinationCountry,
        numberOfDays: travelPackage.numberOfDays,  numberOfNights: travelPackage.numberOfNights

      },
    ]);
  setTravelPackage=new TravelPackage();
  newTravelPackage=new TravelPackage();
    //navigation.navigate('Agent');
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable={true}
        style={styles.input}
        placeholder="Destination Country"
        onChangeText={handleDestinationCountryChange}
      />

      <TextInput
        editable={true}
        style={styles.input}
        placeholder="Destination City"
        onChangeText={handleDestinationCityChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Days"
        onChangeText={handleNumberOfDaysChange}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Nights"
        onChangeText={handleNumberOfNightsChange}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default PackageScreen;
