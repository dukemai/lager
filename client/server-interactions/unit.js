import axios from 'axios';

export function getUnits(token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/units', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function addUnit(token, name) {
  return new Promise((resolve, reject) => {
    axios.post('/api/unit', {
      name,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function updateUnit(token, name, unitId) {
  return new Promise((resolve, reject) => {
    axios.put('/api/company', {
      name,
      unitId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}
