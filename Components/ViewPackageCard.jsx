import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState} from 'react';
import { deletePackage } from '../util/auth';

export default function ViewPackageCard({ item }) {
  const [show, setShow] = useState(true);
 
  //===delete a booking from booking list====
  const handleDeletePackage = async () => {
    try {
      const response = await deletePackage(item.id);
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
      {show &&<View style={styles.textContainer}>
        <Text style={styles.textBold}>{item.packageName}</Text>
        <Text style={styles.textBold}>{item.flights[0].arrivalCountry + ', ' + item.flights[0].arrivalCity}</Text>
        <Text style={styles.textBold}>{item.daysCount + ' Days, '}</Text>
        <Text style={styles.textBold}>{item.hotels[0].hotelName} </Text>
        <Text style={styles.textBold}> {'Activities: ' + item.activities[0].activityName}</Text>
        <Text style={styles.textBold}>{item.price + ' $'}</Text>

        <TouchableOpacity style={styles.button} onPress={handleDeletePackage}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

      </View>}
      {show && <View style={styles.line}>
      </View>}
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: 'black',
  }
};
