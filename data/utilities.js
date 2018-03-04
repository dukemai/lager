import mongoose from 'mongoose';

mongoose.Query.prototype.paginate = function (page, limit, getTotal) {
  return new Promise((resolve, reject) => {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    let query = this;
    const { model } = this;
    const skipFrom = (page * limit) - limit;

    query = query.skip(skipFrom).limit(limit);

    if (getTotal) {
      model
        .count(query._conditions)
        .then((total) => {
          resolve({
            query,
            total,
          });
        })
        .catch((error) => {
          resolve({
            query,
            total: 0,
          });
        });
    } else {
      resolve({
        query,
      });
    }
  });
};
