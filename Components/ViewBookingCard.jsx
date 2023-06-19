import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import { deleteBooking } from '../util/auth';
import { AppContent } from '../store/AppContent';


export default function ViewBookingCard({ item}) {

  const { storedInfo, setFcn} = useContext(AppContent);
  const handleDeleteBooking =async () => {
    try {
      const response = await deleteBooking();
      if (response.status == 200) {
        console.log('I am here........')
        let jwtResponse = await response.json();
        setFcn.updateAgentBookingList(jwtResponse)
        console.log(jwtResponse.bookings[0]);
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  }
  

  return (
    <TouchableOpacity
      style={styles.cardUnSelected}
    >
      <View style={styles.textContainer}>
        <Text style={styles.textBold}>{item.id}</Text>
        <Text style={styles.textBold}>{item.customer_id}</Text>
        <Text style={styles.textBold}>{item.package_id}</Text>
        <Text style={styles.textBold}>{item.bookingID}</Text>
        <Text style={styles.textBold}>{item.departureDate}</Text>
        <Text style={styles.textBold}>{item.returnDate}</Text>

        <TouchableOpacity style={styles.button} onPress={handleDeleteBooking}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
const styles = {
  cardSelected: {
    flex: 1,
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    borderRadius: 16,
    margin: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardUnSelected: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 16,
    margin: 8,
    width: '100%',
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
  },
  textNotBold: {
    fontSize: 10,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 8,
  },
};
