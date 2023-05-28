const url = 'http://samhmd.pythonanywhere.com/';

export async function getPackages() {
  const response = await fetch(url + 'packages', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
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

/*
export async function login(username, password) {
  const response = await fetch(url + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response;
}



export async function signupConfirm(username, confirmationCode) {
  const response = await fetch(url + 'signup/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, confirmationCode }),
  });
  return response;
}

export async function getEvents(token) {
  const response = await fetch(url + 'event', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
}
*/
