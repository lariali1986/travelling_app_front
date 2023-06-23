import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SidebarOption = ({ option, selected, onPress }) => (
  <View>
    <TouchableOpacity
      style={selected ? [styles.option, styles.selectedOption] : styles.option}
      onPress={onPress}
    >
      <Text style={styles.optionText}>{option}</Text>
    </TouchableOpacity>
    <View style={{ width: '100%', height: 1, backgroundColor: '#9E9E9E' }} />
  </View>
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
    //backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    marginVertical: 10,
  },
  selectedOption: {},
  optionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#424242',
  },
});

export default Sidebar;
