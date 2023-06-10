import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContent = createContext({});
export default function AppContentProvider(props) {
  class Customer {
    constructor() {
      this.name = '';
      this.username = '';
      this.email = '';
      this.password = '';
    }
    setCustomerName(name) {
      this.name = name;
    }
    setCustomerUsername(username) {
      this.username = username;
    }
    setCustomerEmail(email) {
      this.email = email;
    }
    setCustomerPassword(password) {
      this.password = password;
    }
  }

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
  const [agentUsername, setAgentUsername] = useState();

  const setTheCustomer = (customer) => {
    setCustomer(customer);
  };

  const setTravelPackages = (packages) => {
    setPackages(packages);
  };

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
  };

  const setFcn = {
    setTheCustomer: setTheCustomer,

    setTravelPackages: setTravelPackages,
    setAuthToken: setAuthToken,
    setAuthAgentToken: setAuthAgentToken,
    logout: logout,
    agentLogout: agentLogout,
    addFlightId: addFlightId,
    rmvFlightId: rmvFlightId,
    addHotelId: addHotelId,
    rmvHotelId: rmvHotelId,
    addActivityId: addActivityId,
    rmvActivityId: rmvActivityId,
    setNumOfDays: setNumOfDays,
    setDepartureDate: setDepartureDate,
    setReturnDate: setReturnDate,
  };
  const systemClasses = {
    customer: customer,
  };

  const value = {
    setFcn: setFcn,
    storedInfo: storedInfo,
    systemClasses: systemClasses,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
}
