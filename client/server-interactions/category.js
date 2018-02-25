import axios from 'axios';

export function getCategories(token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/categories', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export function addCategory(token, name) {
  return new Promise((resolve, reject) => {
    axios.post('/api/category', {
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

export function updateCategory(token, name, categoryId) {
  return new Promise((resolve, reject) => {
    axios.put('/api/category', {
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
