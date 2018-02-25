import express from 'express';
import passport from 'passport';

import { ProductUnit } from '../../data';
import { validateCategory } from '../../common';

const router = express.Router();

router.get('/units', passport.authenticate('jwt', { session: false }), (req, res) => {
  ProductUnit
    .find()
    .then((units) => {
      res.status(200).json({
        units,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.get('/unit', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { unitId } = req.query;
  ProductUnit
    .findById(unitId)
    .then((unit) => {
      res.status(200).json({
        unit,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.post('/unit', passport.authenticate('jwt', { session: false }), (req, res) => {
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
  ProductUnit
    .findOne({
      name,
    })
    .then((unit) => {
      if (unit) {
        res.status(400).json({
          created: false,
          error: 'unit already existed',
        });
      } else {
        const newUnit = new ProductUnit({
          name,
        });
        newUnit
          .save()
          .then((doc) => {
            res.status(201).json({
              created: true,
              unit: doc,
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

router.put('/unit', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    name,
    unitId,
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
  ProductUnit
    .findOne({
      name,
    })
    .then((unit) => {
      if (unit && unit._id !== unitId) {
        res.status(400).json({
          updated: false,
          error: 'company already existed',
        });
      } else {
        ProductUnit
          .findById(unitId)
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
                  unit: updatedResult,
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
