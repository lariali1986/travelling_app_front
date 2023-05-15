import React from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PackageCard({ item }) {
  const navigation = useNavigation();
  function pressHandler(packId) {
    navigation.navigate('Booking', { id: packId });
  }

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: require('../assets/icon.png') }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.country}>{item.destinationCountry}</Text>
        <Text style={styles.city}>{item.destinationCity}</Text>
        <Text style={styles.city}>{item.numberOfDays + ' Days'}</Text>
        <Text style={styles.city}>{item.numberOfNights + ' Nights'}</Text>
        <Text style={styles.city}>{'Hotel ' + item.hotelName}</Text>
        <Text style={styles.city}>{item.price + ' $'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pressHandler(item.id)}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 8,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContainer: {
    padding: 6,
    alignItems: 'center',
  },
  country: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  city: {
    fontSize: 10,
    marginBottom: 4,
  },
  hotel: {
    fontSize: 10,
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};
