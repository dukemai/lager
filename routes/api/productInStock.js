import express from 'express';
import passport from 'passport';

import { ProductInStock } from '../../data';
import { validateProductInStock } from '../../common';

const router = express.Router();

router.get('/products-in-stock', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { page, pageSize } = req.query;
  const toTake = pageSize || 20;
  ProductInStock
    .find()
    .paginate(page || 1, toTake, true)
    .then(({ query, total }) => {
      query.populate({
        path: 'productId',
        populate: { path: 'category' },
      })
        .populate('unit')
        .populate('distributor')
        .then((productsInStock) => {
          res.status(200).json({
            productsInStock,
            total,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    })
    .catch((pagingError) => {
      res.status(500).json({
        pagingError,
      });
    });
});

router.get('/product-in-stock', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { productId } = req.query;
  ProductInStock
    .findOne({ productId })
    .then((productInStock) => {
      res.status(200).json({
        productInStock,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.post('/product-in-stock', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    productId,
    distributorId,
    price,
    retailPrice,
    quantity,
    unitId,
  } = req.body;
  if (!validateProductInStock({
    productId,
    price,
    retailPrice,
    distributorId,
  })) {
    res.status(400).json({
      created: false,
      error: 'validation failed',
    });
    return;
  }
  ProductInStock
    .findOne({
      productId,
    })
    .then((product) => {
      if (product) {
        res.status(400).json({
          created: false,
          error: 'product already existed',
        });
      } else {
        const newProduct = new ProductInStock({
          productId,
          distributor: distributorId,
          price,
          retailPrice,
          quantity,
          unit: unitId,
        });
        newProduct
          .save()
          .then((doc) => {
            res.status(201).json({
              created: true,
              productInStock: doc,
            });
          })
          .catch((saveError) => {
            res.status(500).json({
              created: false,
              error: saveError,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.put('/product-in-stock', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    productId,
    distributorId,
    price,
    retailPrice,
    quantity,
    productInStockId,
    unitId,
  } = req.body;
  if (!validateProductInStock({
    productId,
    price,
    retailPrice,
  })) {
    res.status(400).json({
      updated: false,
      error: 'validation failed',
    });
    return;
  }
  ProductInStock
    .findById(productInStockId)
    .then((doc) => {
      const toUpdate = {
        ...doc,
        distributorId,
        price,
        retailPrice,
        quantity,
        unit: unitId,
      };
      toUpdate
        .save()
        .then((updatedResult) => {
          res.status(200).json({
            updated: true,
            productInStock: updatedResult,
          });
        })
        .catch((saveError) => {
          res.status(500).json({
            updated: false,
            error: saveError,
          });
        });
    })
    .catch((findError) => {
      res.status(500).json({
        updated: false,
        error: findError,
      });
    });
});

export default router;
