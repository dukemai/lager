import axios from 'axios';

export function getProducts(token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/products', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function addProduct(token, name) {
  return new Promise((resolve, reject) => {
    axios.post('/api/product', {
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

export function updateProduct(token, name, categoryId) {
  return new Promise((resolve, reject) => {
    axios.put('/api/product', {
      name,
      categoryId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}
