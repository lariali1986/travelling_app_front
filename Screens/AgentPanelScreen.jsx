import React, { useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Sidebar from '../Components/ui/sideBar';
import { AppContent } from '../store/AppContent';
import LogOutAgent from '../Components/ui/LogOutAgent';
import { useNavigation } from '@react-navigation/native';
import { viewBooking } from '../util/auth';
import ViewBookingCardGroup from '../Components/ViewBookingCardGroup';
import ViewPackageCardGroup from '../Components/ViewPackageCardGroup';
import AgentCreatePackage from '../Components/AgentCreatePackage';
import { getInfoForCreateAgent, getPackages } from '../util/auth';


const AgentPanelScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { storedInfo, setFcn } = useContext(AppContent);
  const [bookingList, setBookingList]=useState();
  const [packageList, setPackageList]=useState();
  const navigation = useNavigation();

  const options = [
    'View Booking',
    'Create Package',
    'Modify Package',
    'View Package',
    'Report',
  ];
  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (selectedOption=='Report'){
      handleReport();

    }else{
    if (option=='View Booking'){
      handleViewBooking();
    }
    if (option=='View Package'){
      handleViewPackage();
    }
  }
    //if (selectedOption=='Create Package'){
     // navigation.navigate('Create Package');

    //}
    // Handle logic to display related information based on the selected option
  };

  
  //=========View Booking===========================
  const handleViewBooking =async () => {
      try {
        const response = await viewBooking();
        if (response.status == 200) {
          let jwtResponse = await response.json();
          setBookingList(jwtResponse.bookings)
          console.log(JSON.stringify(jwtResponse.bookings), 'I am here................');


          //setFcn.updateAgentBookingList(JSON.stringify(jwtResponse));
          //console.log(jwtResponse.bookings);
          
        }
        if (response.status != 200) {
          alert(response.stauts);
        }
      } catch (error) {
        alert(error);
      }
    }
    //=========View Booking===========================
  const handleViewPackage =async () => {
    try {
      const response = await getPackages();
      if (response.status == 200) {
        let jwtResponse = await response.json();
        setPackageList(jwtResponse)
        console.log(JSON.stringify(jwtResponse), 'I am here................');


        //setFcn.updateAgentBookingList(JSON.stringify(jwtResponse));
        //console.log(jwtResponse.bookings);
        
      }
      if (response.status != 200) {
        alert(response.stauts);
      }
    } catch (error) {
      alert(error);
    }
  }
    

  ////==============Report=================
  //  const handleReport =async () => {
  //    try {
  //      const response = await viewReport();
  //      if (response.status == 200) {
  //        console.log('I am here........')
  //        let jwtResponse = await response.json();
  //        console.log(JSON.stringify(jwtResponse));
  //      }
  //      if (response.status != 200) {
  //        alert(response.stauts);
  //      }
  //    } catch (error) {
  //      alert(error);
  //    }
  //  }
  //========================================
//create package
//const handleCreatePackage =async () => {
//  try {
//    const response = await getInfoForCreateAgent();
//    if (response.status == 200) {
//      console.log('I am here........')
//      let jwtResponse = await response.json();
//      console.log(JSON.stringify(jwtResponse));
//    }
//    if (response.status != 200) {
//      alert(response.stauts);
//    }
//  } catch (error) {
//    alert(error);
//  }
//}


//============================================


  const handleLogout = () => {
    setModalVisible(false);
    setFcn.agentLogout();
    navigation.navigate('Home', { showHome: true });
  };

 



  return (
    <View>
      <View>
        <View style={styles.containerHeader}>
          <View style={styles.welcomeContainer}>
            <Text style={{flex: 2, justifyContent: 'flex-end', fontWeight: 'bold'}}>
              Welcome {storedInfo.agentUsername}!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.signOutContainer}
            //ref={buttonRef}
            onPress={() => {
              setModalVisible(true);
              //getButtonPosition();
            }}
          >
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
          <LogOutAgent
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onLogout={handleLogout}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.sideBar}>
        <Sidebar
          options={options}
          selectedOption={selectedOption}
          onOptionPress={handleOptionPress}
        />
        </View>
        <View style={styles.content}>
          {selectedOption=='View Booking' && (
            <ViewBookingCardGroup data={bookingList}/>
          )}
           {selectedOption=='Report' && (
            <ViewBookingCardGroup data={bookingList}/>
          )}
           {selectedOption=='Create Package' && (
            <AgentCreatePackage/>
          )}
          {selectedOption=='View Package' && (
            <ViewPackageCardGroup data={packageList}/>
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
    backgroundColor: 'lightgreen',
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  welcomeContainer: {
    flex:1,
    alignItems: 'flex-end'
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  sideBar:{
    flex: 1,
  },
  signOutContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  signOutText:{
    color: 'blue',
    fontWeight: 'bold',
  }
});

export default AgentPanelScreen;
