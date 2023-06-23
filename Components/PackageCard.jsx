import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AppContent } from '../store/AppContent';

export default function PackageCard({ item }) {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  const [isLogin, setIsLogin] = useState(false);

  function pressHandler() {
    console.log('insdie card is my knowledge' + !storedInfo.isAuthenticated);
    if (!storedInfo.isAuthenticated) {
      alert('Please Login First');
    } else {
      navigation.navigate('Confirm Pre Package', { packageInfo: item });
    }
  }

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: require('../assets/Rome.png') }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textBold}>{item.packageName}</Text>
        <Text style={styles.textBold}>
          {item.flights[0].arrivalCountry + ', ' + item.flights[0].arrivalCity}
        </Text>
        <Text style={styles.textNotBold}>{item.daysCount + ' Days, '}</Text>
        <Text style={styles.textBold}>{item.hotels[0].hotelName}</Text>

        <Text style={styles.textNotBold}>
          {'Activities: ' + item.activities[0].activityName}
        </Text>
        <Text style={styles.textNotBold}>{item.price + ' $'}</Text>
        <TouchableOpacity style={styles.button} onPress={pressHandler}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    margin: 4,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '40%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 6,
    alignItems: 'center',
    width: '60%',
  },
  textBold: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#424242',
  },
  textNotBold: {
    fontSize: 10,
    marginBottom: 4,
    color: '#424242',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
  },
};
