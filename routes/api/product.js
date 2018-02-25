import express from 'express';
import passport from 'passport';

import { Product } from '../../data';
import { validateProduct } from '../../common';

const router = express.Router();

router.get('/products', passport.authenticate('jwt', { session: false }), (req, res) => {
  Product
    .find()
    .then((products) => {
      res.status(200).json({
        products,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.get('/product', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { productId } = req.query;
  Product
    .findById(productId)
    .then((product) => {
      res.status(200).json({
        product,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.post('/product', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    name,
    code,
    companyId,
    image,
    categoryId,
  } = req.body;
  if (!validateProduct({
    name,
    code,
  })) {
    res.status(400).json({
      created: false,
      error: 'validation failed',
    });
    return;
  }
  Product
    .findOne({
      name,
      code,
    })
    .then((product) => {
      if (product) {
        res.status(400).json({
          created: false,
          error: 'product already existed',
        });
      } else {
        const newProduct = new Product({
          name,
          code,
          image,
          category: categoryId,
          manufacturer: companyId,
        });
        newProduct
          .save()
          .then((doc) => {
            res.status(201).json({
              created: true,
              product: doc,
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

router.put('/product', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    name,
    code,
    companyId,
    image,
    categoryId,
    productId,
  } = req.body;
  if (!validateProduct({
    name,
    code,
  })) {
    res.status(400).json({
      updated: false,
      error: 'validation failed',
    });
    return;
  }
  Product
    .findOne({
      code,
    })
    .then((product) => {
      if (product && product._id !== productId) {
        res.status(400).json({
          updated: false,
          error: 'company already existed',
        });
      } else {
        Product
          .findById(productId)
          .then((doc) => {
            const toUpdate = {
              ...doc,
              name,
              code,
              companyId,
              image,
              categoryId,
            };
            toUpdate
              .save()
              .then((updatedResult) => {
                res.status(200).json({
                  updated: true,
                  product: updatedResult,
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
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

export default router;
