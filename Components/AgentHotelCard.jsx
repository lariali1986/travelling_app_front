import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function AgentHotelCard({ item, active, sendSelectedToParent }) {
  const [btnTxt, setBtnTxt] = useState('Book');

  //==coming back to page keep the selected items displayed
  if (active.includes(item.id) && btnTxt == 'Book') {
    setBtnTxt('Cancel');
  }

  //=====Start: Store the selected Items as a List============
  function selectItemHandler() {
    if (btnTxt === 'Book') {
      setBtnTxt('Cancel');
      sendSelectedToParent(item.id, 'add');
      }
    if (btnTxt === 'Cancel') {
      setBtnTxt('Book');
      sendSelectedToParent(item.id, 'rmv');
    }
  }

  return (
    <TouchableOpacity
      style={btnTxt === 'Book' ? styles.cardUnSelected : styles.cardSelected}
    >
      <View style={styles.textContainer}>
        <Text style={styles.textBold}>{item.hotelName}</Text>
        <Text style={styles.textNotBold}>{'City: ' + item.cityName}</Text>
        <Text style={styles.textBold}>
          {'Price Per Night: ' + item.pricePerNight}
        </Text>
        <TouchableOpacity style={styles.button} onPress={selectItemHandler}>
          <Text style={styles.buttonText}>{btnTxt}</Text>
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
