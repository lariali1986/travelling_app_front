import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContent = createContext({});
export default function AppContentProvider(props) {

  //=========Customer side screen variables==========
  const [customer, setCustomer] = useState();
  const [packages, setPackages] = useState();
  const [flightID, setFlightID] = useState([]);
  const [hotelID, setHotelID] = useState([]);
  const [activityID, setActivityID] = useState([]);
  const [daysCount, setDaysCount] = useState();
  const [check_in_date, setCheck_in_date] = useState();
  const [check_out_date, setCheck_out_date] = useState();
  const [token, setToken] = useState(null);
  const [agentToken, setAgentToken] = useState(null);
  const [customerUsername, setCustomerUsername] = useState();
  //==========Agent side screen variables====
  const [agentUsername, setAgentUsername] = useState();
  const [agentBookingList, setAgentBookingList] = useState();
  const [flightIDAgent, setFlightIDAgent] = useState([]);
  const [hotelIDAgent, setHotelIDAgent] = useState([]);
  const [activityIDAgent, setActivityIDAgent] = useState([]);
  //==============================================

  const setTheCustomer = (customer) => {
    setCustomer(customer);
  };  
  const setTravelPackages = (packages) => {
    setPackages(packages);
  };

//============Customer side screens functions==============

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUsername = await AsyncStorage.getItem('customerUsername');
      const storedAgentToken = await AsyncStorage.getItem('agentToken');
      const storedAgentUsername = await AsyncStorage.getItem('agentUsername');
      if (storedToken) {
        setAuthToken(storedToken, storedUsername);
      }
      if (storedAgentToken) {
        setAuthAgentToken(storedAgentToken, storedAgentUsername);
      }
    }
    fetchToken();
  }, []);

  const setAuthToken = (token, customerUsername) => {
    setToken(token);
    setCustomerUsername(customerUsername);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('customerUsername', customerUsername);
  };

  const logout = () => {
    setToken(null);
    setCustomerUsername(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('customerUsername');
  };
  
  const addFlightId = (newFlightID) => {
    setFlightID([...flightID, ...newFlightID]);
  };
  const rmvFlightId = (rmvFlightID) => {
    setFlightID(flightID.filter((item) => item !== rmvFlightID));
  };
  const addHotelId = (newHotelID) => {
    setHotelID([...hotelID, ...newHotelID]);
  };
  const rmvHotelId = (rmvHotelID) => {
    setHotelID(hotelID.filter((item) => item !== rmvHotelID));
  };
  const addActivityId = (newActivityID) => {
    setActivityID([...activityID, ...newActivityID]);
  };
  const rmvActivityId = (rmvActivityID) => {
    setActivityID(activityID.filter((item) => item !== rmvActivityID));
  };

  const setNumOfDays = (daysCount) => {
    setDaysCount(daysCount);
  };
  const setDepartureDate = (date) => {
    setCheck_in_date(date);
  };
  const setReturnDate = (date) => {
    setCheck_out_date(date);
  };
  
  //=========Agent side screens functions==========
  //===============================================
  const setAuthAgentToken = (agentToken, agentUsername) => {
    setAgentToken(agentToken);
    setAgentUsername(agentUsername);
    AsyncStorage.setItem('agentToken', agentToken);
    AsyncStorage.setItem('agentUsername', agentUsername);
  };

  const agentLogout = () => {
    setAgentToken(null);
    setAgentUsername(null);
    AsyncStorage.removeItem('agentToken');
    AsyncStorage.removeItem('agentUsername');
  };

  const updateAgentBookingList = (agentBookingList) => {
    setAgentBookingList(agentBookingList)
    };

    const addFlightIdAgent = (newFlightID) => {
      setFlightIDAgent([...flightIDAgent, ...newFlightID]);
    };
    const rmvFlightIdAgent = (rmvFlightID) => {
      setFlightIDAgent(flightIDAgent.filter((item) => item !== rmvFlightID));
    };
    const addHotelIdAgent = (newHotelID) => {
      setHotelIDAgent([...hotelIDAgent, ...newHotelID]);
    };
    const rmvHotelIdAgent = (rmvHotelID) => {
      setHotelIDAgent(hotelIDAgent.filter((item) => item !== rmvHotelID));
    };
    const addActivityIdAgent = (newActivityID) => {
      setActivityIDAgent([...activityIDAgent, ...newActivityID]);
    };
    const rmvActivityIdAgent = (rmvActivityID) => {
      setActivityIDAgent(activityIDAgent.filter((item) => item !== rmvActivityID));
    };

  
//=========Agent side screens functions==========
//===============================================

  const storedInfo = {
    customer: customer,
    packages: packages,
    customerUsername: customerUsername,
    agentUsername: agentUsername,
    hotelID: hotelID,
    flightID: flightID,
    activityID: activityID,
    daysCount: daysCount,
    check_in_date: check_in_date,
    check_out_date: check_out_date,
    token: token,
    agentToken: agentToken,
    isAuthenticated: !!token,
    agentBookingList: agentBookingList,

    //===Agent===
    flightIDAgent: flightIDAgent,
    hotelIDAgent: hotelIDAgent,
    activityIDAgent: activityIDAgent,
  };

  const setFcn = {
    setTheCustomer: setTheCustomer,
    setTravelPackages: setTravelPackages,
    setAuthToken: setAuthToken,
    setAuthAgentToken: setAuthAgentToken,
    logout: logout,
    addFlightId: addFlightId,
    rmvFlightId: rmvFlightId,
    addHotelId: addHotelId,
    rmvHotelId: rmvHotelId,
    addActivityId: addActivityId,
    rmvActivityId: rmvActivityId,
    setNumOfDays: setNumOfDays,
    setDepartureDate: setDepartureDate,
    setReturnDate: setReturnDate,
    

    /// agent===========
    agentLogout: agentLogout,
    updateAgentBookingList: updateAgentBookingList,
    addFlightIdAgent: addFlightIdAgent,
    rmvFlightIdAgent: rmvFlightIdAgent,
    addHotelIdAgent: addHotelIdAgent,
    rmvHotelIdAgent: rmvHotelIdAgent,
    addActivityIdAgent: addActivityIdAgent,
    rmvActivityIdAgent: rmvActivityIdAgent,

  };

  const value = {
    setFcn: setFcn,
    storedInfo: storedInfo,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
}
