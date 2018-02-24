import axios from 'axios';

export function getDistributors(token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/distributors', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function addDistributor(
  token, distributorName, contactName, phoneNumber, email, address,
  tax, website, companyId,
) {
  return new Promise((resolve, reject) => {
    axios.post('/api/distributor', {
      distributorName,
      contactName,
      phoneNumber,
      email,
      address,
      tax,
      website,
      companyId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function updateDistributor(
  token, distributorId, distributorName, contactName, phoneNumber, email, address,
  tax, website,
) {
  return new Promise((resolve, reject) => {
    axios.put('/api/distributor', {
      distributorName,
      contactName,
      phoneNumber,
      email,
      address,
      tax,
      website,
      distributorId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function linkDistributorToCompany(token, distributorId, companyId) {
  return new Promise((resolve, reject) => {
    axios.put('/api/distributor-manufacturers', {
      companyId,
      distributorId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function unlinkDistributorToCompany(token, distributorId, companyId) {
  return new Promise((resolve, reject) => {
    axios.delete('/api/distributor-manufacturers', {
      companyId,
      distributorId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}
