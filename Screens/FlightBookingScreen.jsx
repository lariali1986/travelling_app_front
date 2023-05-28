import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const FlightBookingScreen = () => {
  const [selectedFlights, setSelectedFlights] = useState([]);

  // Dummy data for the available flights
  const availableFlights = [
    { id: '1', name: 'Flight 1' },
    { id: '2', name: 'Flight 2' },
    { id: '3', name: 'Flight 3' },
    { id: '4', name: 'Flight 4' },
    { id: '5', name: 'Flight 5' },
  ];

  const handleFlightSelection = (flight) => {
    // Add or remove the selected flight from the list
    setSelectedFlights((prevSelectedFlights) => {
      const isFlightSelected = prevSelectedFlights.find((selectedFlight) => selectedFlight.id === flight.id);

      if (isFlightSelected) {
        return prevSelectedFlights.filter((selectedFlight) => selectedFlight.id !== flight.id);
      } else {
        return [...prevSelectedFlights, flight];
      }
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedFlights.find((flight) => flight.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.flightItem, isSelected && styles.selectedFlightItem]}
        onPress={() => handleFlightSelection(item)}
      >
        <Text style={styles.flightItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please Select a Flight</Text>

      <FlatList
        data={availableFlights}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />

      <TouchableOpacity style={styles.hotelButton}>
        <Text style={styles.hotelButtonText}>Hotel Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flightItem: {
    padding: 10,
  },
  selectedFlightItem: {
    backgroundColor: 'lightblue',
  },
  flightItemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  hotelButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  hotelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlightBookingScreen;
