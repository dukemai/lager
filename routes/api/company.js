import express from 'express';
import passport from 'passport';

import { Company } from '../../data';
import { validateCompany } from '../../common';

const router = express.Router();

router.get('/companies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Company
    .find()
    .then((companies) => {
      res.status(200).json({
        companies,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.get('/company', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { companyId } = req.query;
  Company
    .findById(companyId)
    .then((company) => {
      res.status(200).json({
        company,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.post('/company', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    companyName, contactName, phoneNumber, email, address,
    tax, website,
  } = req.body;
  if (!validateCompany({
    name: companyName,
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
  Company
    .findOne({
      name: companyName,
    })
    .then((company) => {
      if (company) {
        res.status(400).json({
          created: false,
          error: 'company already existed',
        });
      } else {
        const newCompany = new Company({
          name: companyName,
          contactName,
          phoneNumber,
          email,
          address,
          tax,
          website,
        });
        newCompany
          .save()
          .then((doc) => {
            res.status(201).json({
              created: true,
              company: doc,
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

router.put('/company', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    companyName, contactName, phoneNumber, email, address,
    tax, website, companyId,
  } = req.body;
  if (!validateCompany({
    name: companyName,
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
  Company
    .findOne({
      name: companyName,
    })
    .then((company) => {
      if (company && company._id !== companyId) {
        res.status(400).json({
          updated: false,
          error: 'company already existed',
        });
      } else {
        Company
          .findById(companyId)
          .then((doc) => {
            const toUpdate = {
              ...doc,
              name: companyName,
              contactName,
              phoneNumber,
              email,
              address,
              tax,
              website,
              companyId,
            };
            toUpdate
              .save()
              .then((updatedResult) => {
                res.status(200).json({
                  updated: true,
                  company: updatedResult,
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
          })
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

export default router;
