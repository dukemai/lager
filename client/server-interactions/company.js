import axios from 'axios';

export function getCompanies(token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/companies', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function addCompany(
  token, companyName, contactName, phoneNumber, email, address,
  tax, website,
) {
  return new Promise((resolve, reject) => {
    axios.post('/api/company', {
      companyName,
      contactName,
      phoneNumber,
      email,
      address,
      tax,
      website,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function updateCompany(
  token, companyName, contactName, phoneNumber, email, address,
  tax, website, companyId,
) {
  return new Promise((resolve, reject) => {
    axios.put('/api/company', {
      companyId,
      companyName,
      contactName,
      phoneNumber,
      email,
      address,
      tax,
      website,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}
