import express from 'express';
import passport from 'passport';

import { ProductCategory } from '../../data';
import { validateCategory } from '../../common';

const router = express.Router();

router.get('/categories', passport.authenticate('jwt', { session: false }), (req, res) => {
  ProductCategory
    .find()
    .then((categories) => {
      res.status(200).json({
        categories,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.get('/category', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { categoryId } = req.query;
  ProductCategory
    .findById(categoryId)
    .then((category) => {
      res.status(200).json({
        category,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.post('/category', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    name,
  } = req.body;
  if (!validateCategory({
    name,
  })) {
    res.status(400).json({
      created: false,
      error: 'validation failed',
    });
    return;
  }
  ProductCategory
    .findOne({
      name,
    })
    .then((category) => {
      if (category) {
        res.status(400).json({
          created: false,
          error: 'category already existed',
        });
      } else {
        const newCategory = new ProductCategory({
          name,
        });
        newCategory
          .save()
          .then((doc) => {
            res.status(201).json({
              created: true,
              category: doc,
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

router.put('/category', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    name,
    categoryId,
  } = req.body;
  if (!validateCategory({
    name,
  })) {
    res.status(400).json({
      updated: false,
      error: 'validation failed',
    });
    return;
  }
  ProductCategory
    .findOne({
      name,
    })
    .then((category) => {
      if (category && category._id !== categoryId) {
        res.status(400).json({
          updated: false,
          error: 'company already existed',
        });
      } else {
        ProductCategory
          .findById(categoryId)
          .then((doc) => {
            const toUpdate = {
              ...doc,
              name,
            };
            toUpdate
              .save()
              .then((updatedResult) => {
                res.status(200).json({
                  updated: true,
                  category: updatedResult,
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
