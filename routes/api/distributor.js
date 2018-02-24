import express from 'express';
import passport from 'passport';
import { remove } from 'lodash';

import { Distributor } from '../../data';
import { validateDistributor } from '../../common';

const router = express.Router();

router.get('/distributors', passport.authenticate('jwt', { session: false }), (req, res) => {
  Distributor
    .find()
    .then((distributors) => {
      res.status(200).json({
        distributors,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.get('/distributor', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { distributorId } = req.query;
  Distributor
    .findById(distributorId)
    .then((distributor) => {
      res.status(200).json({
        distributor,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.post('/distributor', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    distributorName, contactName, phoneNumber, email, address,
    tax, website, companyId,
  } = req.body;
  if (!validateDistributor({
    name: distributorName,
    contactName,
    phoneNumber,
    email,
    address,
    tax,
    website,
  })) {
    res.status(400).json({
      created: false,
      error: 'validation failed',
    });
    return;
  }
  Distributor
    .findOne({
      name: distributorName,
    })
    .then((distributor) => {
      if (distributor) {
        res.status(400).json({
          created: false,
          error: 'Distributor already existed',
        });
      } else {
        const newDistributor = new Distributor({
          name: distributorName,
          contactName,
          phoneNumber,
          email,
          address,
          tax,
          website,
          manufacturers: [companyId],
        });
        newDistributor
          .save()
          .then((doc) => {
            res.status(201).json({
              created: true,
              distributor: doc,
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

router.put('/distributor', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    distributorName, contactName, phoneNumber, email, address,
    tax, website, distributorId,
  } = req.body;
  if (!validateDistributor({
    name: distributorName,
    contactName,
    phoneNumber,
    email,
    address,
    tax,
    website,
  })) {
    res.status(400).json({
      updated: false,
      error: 'validation failed',
    });
    return;
  }
  Distributor
    .findOne({
      name: distributorName,
    })
    .then((company) => {
      if (company && company._id !== distributorId) {
        res.status(400).json({
          updated: false,
          error: 'Distributor already existed',
        });
      } else {
        Distributor
          .findById(distributorId)
          .then((doc) => {
            const toUpdate = {
              ...doc,
              name: distributorName,
              contactName,
              phoneNumber,
              email,
              address,
              tax,
              website,
            };
            toUpdate
              .save()
              .then((updatedResult) => {
                res.status(200).json({
                  updated: true,
                  distributor: updatedResult,
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

router.put('/distributor-manufacturers', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    distributorId, companyId,
  } = req.body;
  Distributor
    .findById(distributorId)
    .then((doc) => {
      const toUpdate = doc;
      if (toUpdate.manufacturers && toUpdate.manufacturers.indexOf(companyId) === -1) {
        toUpdate.manufacturers.push(companyId);
        toUpdate
          .update('manufacturers', toUpdate.manufacturers)
          .save()
          .then((updatedResult) => {
            res.status(200).json({
              updated: true,
              distributor: updatedResult,
            });
          })
          .catch((saveError) => {
            res.status(500).json({
              updated: false,
              error: saveError,
            });
          });
      } else {
        res.status(200).json({
          updated: false,
        });
      }
    })
    .catch((findError) => {
      res.status(500).json({
        updated: false,
        error: findError,
      });
    });
});

router.delete('/distributor-manufacturers', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    distributorId, companyId,
  } = req.body;
  Distributor
    .findById(distributorId)
    .then((doc) => {
      const toUpdate = doc;
      if (toUpdate.manufacturers && toUpdate.manufacturers.indexOf(companyId) > -1) {
        remove(toUpdate.manufacturers, companyId);
        toUpdate
          .update('manufacturers', toUpdate.manufacturers)
          .save()
          .then((updatedResult) => {
            res.status(200).json({
              updated: true,
              distributor: updatedResult,
            });
          })
          .catch((saveError) => {
            res.status(500).json({
              updated: false,
              error: saveError,
            });
          });
      } else {
        res.status(200).json({
          updated: false,
        });
      }
    })
    .catch((findError) => {
      res.status(500).json({
        updated: false,
        error: findError,
      });
    });
});

export default router;
