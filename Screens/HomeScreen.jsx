import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  Dimensions,
  ImageBackground,
} from 'react-native';
import PackageCardGroup from '../Components/PackageCardGroup';
import LoginScreen from '../Components/LoginScreen';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';
import { getPackages } from '../util/auth';
import LogoutModal from '../Components/ui/LogoutModal';
import { Button } from 'native-base';

//const predefinedPackages = require('../data/predefined_packages.json');
const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { storedInfo, setFcn } = useContext(AppContent);
  const [packages, setPackages] = useState();
  const [btn, setBtn] = useState('Home');
  const [destination, setDestination] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [visible, setVisible] = useState(false);
  //---
  const buttonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({
    top: 0,
    height: 0,
    left: 0,
  });
  //---

  if (!!storedInfo.agentToken) {
    console.log('..........' + 'I am inside');
    navigation.navigate('Agent Panel');
  }

  const getButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get('window').height;
        const modalTop = pageY + height - 380;
        const modalHeight = screenHeight - modalTop - 100;
        setModalPosition({ top: modalTop, height: modalHeight, left: 130 });
        console.log(modalTop);
        console.log(modalHeight);
      });
    }
  };

  const handleLogout = () => {
    setVisible(false);
    setFcn.logout();
  };

  //if (storedInfo.isAuthenticated) {
  if (!!route.params) {
    const { showHome } = route.params;
    if (showHome) {
      if (btn !== 'Home') {
        setBtn('Home');
        route.params = {};
      }
      //  }
      //activeHome = false;
    }
  }

  async function handlePackages() {
    try {
      const response = await getPackages();

      if (response.status == 200) {
        console.log('Hi');
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

  if (!packages && !storedInfo.agentToken) {
    handlePackages();
  }

  const handleSearch = () => {
    const filteredPackages = storedInfo.packages.filter((item) => {
      let packageDestination = item.flights[0].arrivalCity;
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
    <View style={styles.container}>
        <View style={styles.signOutWelcomeContainer}>
          {storedInfo.isAuthenticated && (
            <TouchableOpacity
              style={styles.signOutContainer}
              ref={buttonRef}
              onPress={() => {
                setVisible(true);
                getButtonPosition();
              }}
            >
              <Image
                source={require('../assets/human.png')}
                style={styles.buttonImage}
              />
              {/*<Text style={styles.signOutText}>Sign out</Text>*/}
            </TouchableOpacity>
          )}
          {storedInfo.isAuthenticated && (
            <Text style={styles.welcomeText}>
              {storedInfo.customerUsername}
            </Text>
          )}
        </View>
        <View
          style={
            btn == 'Home' ? styles.containerHome : styles.containerOtherScreen
          }
        >
          <View style={storedInfo.isAuthenticated? styles.header: [styles.header, {marginTop: 80}]}>
            {/*<Image source={require('../assets/logo.png')} style={styles.logo} />*/}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setBtn('Home')}
              >
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={
                  storedInfo.isAuthenticated
                    ? () => navigation.navigate('Custom Package')
                    : () => alert('Please Login First')
                }
              >
                <Text style={styles.buttonText}>CustomPackage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setBtn('About Us')}
              >
                <Text style={styles.buttonText}>About Us</Text>
              </TouchableOpacity>

              {!storedInfo.isAuthenticated && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setBtn('Login')}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              )}

              {storedInfo.isAuthenticated && (
                <LogoutModal
                  visible={visible}
                  modalPosition={modalPosition}
                  onCancel={() => setVisible(false)}
                  onLogout={handleLogout}
                />
              )}
            </View>
          </View>

          {btn === 'Home' && (
            <View style={styles.makeMargin}>
              <Text style={[styles.headingText, {marginBottom:10}]}>Search Packages</Text>
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
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={handleSearch}
                >
                  <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.container}>
            {btn === 'Home' && (
              <Text style={[styles.headingText, {color:'yellow', textShadowColor: 'black'}]}>Available Packages</Text>
            )}
            {btn === 'Home' && <View style={[styles.line, , {marginBottom: 1}]} />}
            {btn === 'Home' && (
              <PackageCardGroup data={packages} style={styles.item} />
            )}
            {btn === 'About Us' && <Text>Implemented Later</Text>}
            {btn === 'Login' && <LoginScreen />}
          </View>
        </View>
    </View>
  );
};

const styles = {
  containerHome: {
    flex: 1,
    backgroundColor:'black',
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  containerOtherScreen: {
    flex: 1,
    backgroundColor: 'grey',
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 1,
  },
  makeMargin: {
    marginBottom: 20,
    marginTop: 1,
  },
  input: {
    height: 28,
    width: '35%',
    borderColor: 'white',
    color: 'white',
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
    marginBottom: 30,
    paddingHorizontal: 8,
    width: '90%',
  },
  line: {
    height: 1.8,
    width: '80%',
    backgroundColor: 'white',
    marginTop: 6,
  },
  signOutContainer: {
    flexDirection: 'row',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  signOutWelcomeContainer: {
    marginRight: 10,
    marginBottom: 7,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headingText: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'yellow',
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
    color: 'yellow',
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
  welcomeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signOutText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  buttonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
};

export default HomeScreen;