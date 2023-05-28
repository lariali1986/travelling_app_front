import { createContext, useState } from 'react';

export const AppContent = createContext({});

export default function AppContentProvider(props) {
  const predefinedPackages = require('../data/predefined_packages.json');
  const [packages, setPackages] = useState();
  const [customerList, setCustomerList] = useState([]);
  const [report, setReport] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [token, setToken] = useState();

  //const updateData = (newData) => {
  //  setData([...data, ...newData]);
  //};

  const setTravelPackages = (packages) => {
    setPackages(packages);
  };

  

  const updateCustomerList = (newCustomer) => {
    setCustomerList([...customerList, ...newCustomer]);
  };

  const addReport = (newReport) => {
    setReport([...report, ...newReport]);
  };

  const updateReport = (report) => {
    setReport(report);
  };

  const bookingListAdd = (newBooking) => {
    setBookingList([...bookingList, ...newBooking]);
  };

  const updateBookingList = (bookingList) => {
    setBookingList(bookingList);
  }
    
  const setAuthToken = (token) => {
      setToken(token);
  }

//const objectIdToRemove = 2;

//const index = array.findIndex(obj => obj.id === objectIdToRemove);
//if (index > -1) {
  //array.splice(index, 1);

  


  


  const storedInfo = {
    packages: packages,
    customerList: customerList,
    report: report,
    bookingList: bookingList,
    token: token, 
    isAuthenticated: !!token,
  };

  const setFcn = {
    setTravelPackages: setTravelPackages,
    setAuthToken: setAuthToken,
    //updateData: updateData,
    updateCustomerList: updateCustomerList,
    addReport: addReport,
    updateReport: updateReport,
    bookingListAdd: bookingListAdd,
    updateBookingList: updateBookingList,
    
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
