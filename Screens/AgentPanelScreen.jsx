import React, { useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Sidebar from '../Components/ui/sideBar';
import { AppContent } from '../store/AppContent';
import LogoutModal from '../Components/ui/LogoutModal';
import { useNavigation } from '@react-navigation/native';


const AgentPanelScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const { storedInfo, setFcn } = useContext(AppContent);
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  const navigation=useNavigation();
  console.log(storedInfo.agentUsername);
  const [modalPosition, setModalPosition] = useState({
    top: 0,
    height: 0,
    left: 0,
  });

  const handleLogout = () => {
    setVisible(false);
    setFcn.agentLogout();
    navigation.navigate('Home', {showHome: true});
    
  };

  const getButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get('window').height;
        const modalTop = pageY + height - 380;
        const modalHeight = screenHeight - modalTop - 100;
        setModalPosition({ top: modalTop, height: modalHeight, left: 0 });
        console.log(modalTop);
        console.log(modalHeight);
      });
    }
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    // Handle logic to display related information based on the selected option
  };

  const options = [
    'View Booking',
    'Create Package',
    'Modify Package',
    'View Package',
    'Report',
  ];

  return (
    <View>
      <View>
        <View style={styles.containerHeader}>
          <Text style={{ fontWeight: 'bold' }}>
            Welcome {storedInfo.agentUsername}!
          </Text>
          <TouchableOpacity
            style={styles.signOutContainer}
            ref={buttonRef}
            onPress={() => {
              setVisible(true);
              getButtonPosition();
            }}
          >
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        </View>

        <LogoutModal
          visible={visible}
          modalPosition={modalPosition}
          onCancel={() => setVisible(false)}
          onLogout={handleLogout}
        />
      </View>

      <View style={styles.container}>
        <Sidebar
          options={options}
          selectedOption={selectedOption}
          onOptionPress={handleOptionPress}
        />
        <View style={styles.content}>
          {/* Display related information based on the selected option */}
          {selectedOption && (
            <Text>{`Selected Option: ${selectedOption}`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
  },
  containerHeader: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'pink',
  },
  signOut: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgentPanelScreen;
