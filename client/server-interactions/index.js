import axios from 'axios';

export function registerAccount(userName, password, phoneNumber, firstName, lastName) {
  return new Promise((resolve, reject) => {
    axios.post('/api/register', {
      userName,
      password,
      phoneNumber,
      firstName,
      lastName,
    })
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}

export function updateAccount(token, userName, password, oldPassword, phoneNumber, firstName, lastName) {
  return new Promise((resolve, reject) => {
    axios.post('/api/update', {
      userName,
      password,
      oldPassword,
      phoneNumber,
      firstName,
      lastName,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}

export function login(userName, password) {
  return new Promise((resolve, reject) => {
    axios.post('/api/login', {
      userName,
      password,
    })
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    axios.get('/api/logout')
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}

export function authenticate(token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/authen', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}

export function upload(token, email, phoneNumber, message, files) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('email', email);
    data.append('phoneNumber', phoneNumber);
    data.append('message', message);

    [...files].forEach((file) => {
      data.append('files', file);
    });


    axios.post('/api/upload', data, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}

export function getFiles(token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/files', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}

export function getFile(token, id, password) {
  return new Promise((resolve, reject) => {
    axios.get('/api/file', {
      headers: {
        Authorization: token,
      },
      params: {
        id,
        password,
      },
    })
      .then(res => resolve(res.data))
      .catch(res => reject(res));
  });
}
