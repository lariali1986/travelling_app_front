import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PackageCardGroup from '../Components/PackageCardGroup';
import { AppContent } from '../store/AppContent';
import PackageScreen from './PackageScreen';
import CustomerScreen from './CustomerScreen';
//import predefined_packages from '../data/predefined_packages.json';
//import { writeFile } from 'react-native-fs';
//import { writeFile } from 'react-native-fs';

/*
const data = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com'
};

writeFile('../data/predefined_packages.json', JSON.stringify(data), 'utf8', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Data written to file');
  }
});

*/

//const BUTTONS = [{ label: 'Package List', items: ['Country: Canada  City:Montreal', 'Item 1.2', 'Item 1.3'] }];

const BUTTONS = [
  { label: 'Package List' },
  { label: 'Create Package' },
  { label: 'Create Customer' },
];

//const image1 = require('../assets/icon.png');

const predefinedPackages = require('../data/predefined_packages.json');
//const fs = require('fs')
//fs.readFile()

export default function AgentScreen({ navigation }) {
  const [activeButton, setActiveButton] = useState('Package List');
  const { setFcn, storedInfo } = useContext(AppContent);
  console.log(storedInfo.data);

  console.log('i am in the agent');

  const [packages, setPackages] = useState(predefinedPackages);

  const handleButtonPress = (button) => {
    setActiveButton(button);
    switch (button) {
      case 'Create Package':
        //navigation.navigate('Package');
        setActiveButton('Create Package');
        break;
      case 'Package List':
        setActiveButton('Package List');
        setPackages(storedInfo.data);
        //navigation.navigate('Agent');
        break;
      case 'Create Customer':
        setActiveButton('Create Customer');
        setPackages(storedInfo.customerList);
        console.log("customers: "+storedInfo.customerList)
        //navigation.navigate('Agent');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {BUTTONS.map((button) => (
          <TouchableOpacity
            key={button.label}
            style={[
              styles.button,
              button.label === button.label && styles.activeButton,
            ]}
            onPress={() => handleButtonPress(button.label)}
          >
            <Text style={styles.buttonLabel}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.main}>
        <Text style={styles.header}>{activeButton}</Text>
        {activeButton == 'Package List' && (
          <PackageCardGroup data={packages} style={styles.item} />
        )}
        {activeButton == 'Create Package' && <PackageScreen />}
        {activeButton == 'Create Customer' && <CustomerScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRightColor: '#cccccc',
    borderRightWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: '#ffffff',
  },
  main: {
    flex: 3,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});
