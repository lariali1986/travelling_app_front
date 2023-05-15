import { createContext, useState } from 'react';

export const AppContent = createContext({});

export default function AppContentProvider(props) {
  const predefinedPackages = require('../data/predefined_packages.json');
  const [data, setData] = useState(predefinedPackages);
  const [customerList, setCustomerList] = useState([]);
  const [BookingList, setBookingList] = useState([]);

  const updateData = (newData) => {
    setData([...data, ...newData]);
  };

  const updateCustomerList = (newCustomer) => {
    setCustomerList([...customerList, ...newCustomer]);
  };

  const storedInfo = {
    data: data,
    customerList: customerList,
  };

  const setFcn = {
    updateData: updateData,
    updateCustomerList: updateCustomerList,
  };

  const value = {
    setFcn: setFcn,
    storedInfo: storedInfo,
    //storedUsername: username,
    //token: token,
    //isAuthenticated: !!token,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
}
