const url = 'http://3.128.182.187:5000/';
//const url = 'http://samhmd.pythonanywhere.com/';

export async function getPackages() {
  const response = await fetch(url + 'packages', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export async function getAvailableFHA(
  departureCity,
  destinationCity,
  check_in_date,
  check_out_date
) {
  const response = await fetch(url + 'receiveData', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      departureCity,
      destinationCity,
      check_in_date,
      check_out_date,
    }),
  });
  return response;
}

export async function signup(name, userName, email, password) {
  const response = await fetch(url + 'register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, userName, email, password }),
  });
  return response;
}

export async function login(userName, password) {
  const response = await fetch(url + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  });
  return response;
}

export async function agentLogin(userName, password) {
  const response = await fetch(url + 'agentLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  });
  return response;
}

export async function createPackage(
  api_token,
  flight_id,
  hotel_ids,
  activity_ids,
  check_in_date,
  check_out_date,
  flightPrice,
  hotelPrice,
  activityPrice
) {
  const response = await fetch(url + 'createPackage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_token,
      flight_id,
      hotel_ids,
      activity_ids,
      check_in_date,
      check_out_date,
      flightPrice,
      hotelPrice,
      activityPrice,
    }),
  });
  return response;
}

export async function bookPackage(
  api_token,
  package_id,
  check_in_date,
  check_out_date,
  total_price
) {
  const response = await fetch(url + 'booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_token,
      package_id,
      check_in_date,
      check_out_date,
      total_price,
    }),
  });
  return response;
}

export async function viewUserBooking(api_token) {
  const response = await fetch(url + 'viewBooking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_token,
    }),
  });
  return response;
}

export async function viewBooking() {
  const response = await fetch(url + 'viewBooking', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export async function deleteBooking(bookingId) {
  const response = await fetch(url + 'booking', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingId,
    }),
  });
  return response;
}

export async function deletePackage(packageId) {
  const response = await fetch(url + 'packages', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      packageId,
    }),
  });
  return response;
}

export async function agentCreatePackage(flight_ids, hotel_ids, activity_ids, packageName, daysCount) {
  const response = await fetch(url + 'preDefineCreate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      flight_ids, hotel_ids, activity_ids, packageName, daysCount
    }),
  });
  return response;
}



