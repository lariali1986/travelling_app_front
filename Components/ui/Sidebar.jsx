import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SidebarOption = ({ option, selected, onPress }) => (
  <TouchableOpacity
    style={selected ? [styles.option, styles.selectedOption] : styles.option}
    onPress={onPress}
  >
    <Text style={styles.optionText}>{option}</Text>
  </TouchableOpacity>
);

const Sidebar = ({ options, selectedOption, onOptionPress }) => (
  <View style={styles.container}>
    <View style={styles.sidebar}>
      {options.map((option) => (
        <SidebarOption
          key={option}
          option={option}
          selected={selectedOption === option}
          onPress={() => onOptionPress(option)}
        />
      ))}
    </View>
    {/* Additional content or components can be placed here */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    marginVertical: 50,
  },
  selectedOption: {
    backgroundColor: 'pink',
  },
  optionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Sidebar;
