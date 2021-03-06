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

export function addProduct(token, name, code, image, categoryId, companyId) {
  return new Promise((resolve, reject) => {
    axios.post('/api/product', {
      name,
      code,
      image,
      categoryId,
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

export function updateProduct(token, name, code, image, categoryId, companyId, productId) {
  return new Promise((resolve, reject) => {
    axios.put('/api/product', {
      name,
      code,
      image,
      categoryId,
      companyId,
      productId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}
