import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import PackageCardGroup from '../Components/PackageCardGroup';
import LoginScreen from '../Components/LoginScreen';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';
import { getPackages } from '../util/auth';

//const predefinedPackages = require('../data/predefined_packages.json');
const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  const [packages, setPackages] = useState();
  const [btn, setBtn] = useState('Home');
  const [destination, setDestination] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  if (!!route.params) {
    const { showHome } = route.params;
    if (showHome) {
      if (btn !== 'Home') {
        setBtn('Home');
      }
    }
    //activeHome = false;
  }

  async function handlePackages() {
    try {
      const response = await getPackages();
      if (response.status == 200) {
        let jwtResponse = await response.json();
        setFcn.setTravelPackages(jwtResponse);
        setPackages(jwtResponse);
        console.log('this is the response' + jwtResponse);
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  }

  console.log('packages are ', !packages);
  if (!packages) {
    handlePackages();
  }

  const handleSearch = () => {
    const filteredPackages = storedInfo.packages.filter((item) => {
      let packageDestination = item.flights[0].arrivalLocation;
      console.log('this is destination ' + packageDestination);
      let packagePrice = item.price;
      let isDestinationMatch = true;
      let isPriceMatch = true;

      if (destination.trim() !== '') {
        isDestinationMatch = packageDestination
          .toLowerCase()
          .includes(destination.toLowerCase());
      }

      if (maxPrice.trim() !== '') {
        isPriceMatch = packagePrice <= parseFloat(maxPrice);
      }

      return isDestinationMatch && isPriceMatch;
    });
    setPackages(filteredPackages);
    console.log('filteredPackages ' + filteredPackages);
  };

  return (
    <View
      style={btn == 'Home' ? styles.containerHome : styles.containerOtherScreen}
    >
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBtn('Home')}
          >
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Custom Package')}
          >
            <Text style={styles.buttonText}>CustomPackage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBtn('About Us')}
          >
            <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>
          {!storedInfo.isAuthenticated && <TouchableOpacity
            style={styles.button}
            onPress={() => setBtn('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>}
          {storedInfo.isAuthenticated && <Text>Welcome!</Text>}
        </View>
      </View>

      {btn === 'Home' && (
        <Text style={styles.headingText}>Search Packages</Text>
      )}

      {btn === 'Home' && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder='Destination City'
            value={destination}
            onChangeText={setDestination}
          />
          <TextInput
            style={styles.input}
            placeholder='Max Price'
            value={maxPrice}
            onChangeText={setMaxPrice}
            keyboardType='numeric'
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.container}>
        {btn === 'Home' && (
          <Text style={styles.headingText}>Available Packages</Text>
        )}
        {btn === 'Home' && <View style={styles.line} />}
        {btn === 'Home' && (
          <PackageCardGroup data={packages} style={styles.item} />
        )}
        {btn === 'About Us' && <Text>Implemented Later</Text>}
        {btn === 'Login' && <LoginScreen />}
      </View>
    </View>
  );
};

const styles = {
  containerHome: {
    flex: 1,
    backgroundColor: 'lightyellow',
  },
  containerOtherScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 1,
  },
  input: {
    height: 28,
    width: '35%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    marginTop: 8,
    borderRadius: 5,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 20,
    width: '90%',
  },
  line: {
    height: 0.8,
    width: '80%',
    backgroundColor: 'black',
    marginTop: 6,
  },
  headingText: {
    fontSize: 16,
    paddingTop: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: 'blue',
  },
  logo: {
    width: '15%',
    height: 50,
    marginRight: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 6,
  },
  buttonText: {
    opacity: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  item: {
    paddingTop: 20,
  },
  searchButton: {
    height: 25,
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
};

export default HomeScreen;
