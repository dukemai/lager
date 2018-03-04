import axios from 'axios';

export function getProductsInStock(token, page, pageSize) {
  return new Promise((resolve, reject) => {
    axios.get('/api/products-in-stock', {
      headers: {
        Authorization: token,
      },
      params: {
        page,
        pageSize,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function addProductInStock(token, productId, distributorId, quantity, price, retailPrice, unitId) {
  return new Promise((resolve, reject) => {
    axios.post('/api/product-in-stock', {
      productId,
      distributorId,
      quantity,
      price,
      retailPrice,
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

export function updateProductInStock(
  token, productId, distributorId, quantity,
  price, retailPrice, unitId, productInStockId,
) {
  return new Promise((resolve, reject) => {
    axios.put('/api/product-in-stock', {
      productId,
      distributorId,
      quantity,
      price,
      retailPrice,
      unitId,
      productInStockId,
    }, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}
