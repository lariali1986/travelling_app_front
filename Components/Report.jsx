/*import React, { useState, useContext, useRef } from 'react';
import { Text} from 'react-native';
import { viewBooking } from '../util/auth';
import { AppContent } from '../store/AppContent';

export default function Report(){

    const handleViewBooking =async () => {
    try {
      const response = await viewBooking();
      if (response.status == 200) {
        console.log('I am here........')
        let jwtResponse = await response.json();
        console.log(jwtResponse.bookings[0]);
     
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  }

  handleViewBooking();

  return(
    <Text>Hi</Text>
  )
}*/