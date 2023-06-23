import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { deleteBooking } from '../util/auth';

export default function ViewBookingCard({ item }) {
  const [show, setShow] = useState(true);

  //===delete a booking from booking list====
  const handleDeleteBooking = async () => {
    try {
      const response = await deleteBooking(item.id);
      if (response.status == 200) {
        setShow(false);
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  };
  //================================================
  return (
    <TouchableOpacity style={styles.viewCard}>
      {show && (
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>Booking ID: {item.id}</Text>
          <Text style={styles.textBold}>Booking Date:</Text>
          <Text style={styles.textBold}> {item.bookingDate}</Text>
          <Text style={styles.textBold}>Departure Date: </Text>
          <Text style={styles.textBold}> {item.departureDate}</Text>
          <Text style={styles.textBold}>Return Date: {item.returnDate}</Text>
          <Text style={styles.textBold}>CustomerId: {item.customerId}</Text>
          <Text style={styles.textBold}>Packagae ID: {item.packageId}</Text>

          <TouchableOpacity style={styles.button} onPress={handleDeleteBooking}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      {show && <View style={styles.line}></View>}
    </TouchableOpacity>
  );
}
const styles = {
  viewCard: {
    flex: 1,
  },
  textContainer: {
    padding: 6,
    alignItems: 'center',
    width: '100%',
  },
  textBold: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginBottom: 10,
    marginTop: 10,
  },
};
