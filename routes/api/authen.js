import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Account } from '../../data';
import { databaseConfig, getToken } from '../../config';

const router = express.Router();

const isRequestAuthenticated = (req) => {
  const token = getToken(req.headers);
  return token !== null && token !== {} && token !== undefined;
};

router.get('/authen', passport.authenticate('jwt', { session: false }), (req, res) => {
  const user = req.user ? {
    userName: req.user.userName,
    phoneNumber: req.user.phoneNumber,
    contacts: req.user.contacts,
  } : {};
  res.json({
    isAuthenticated: user !== null && isRequestAuthenticated(req),
    user,
  });
});

router.post('/login', (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({
      created: false,
      msg: 'Please pass username and password.',
    });
    return;
  }
  Account.findOne({
    userName,
  }, (err, account) => {
    if (err) throw err;
    if (!account) {
      res.status(401).json({
        success: false,
        msg: 'Authentication failed. User not found.',
      });
    } else {
      // check if password matches
      account.comparePassword(req.body.password, (compareErr, isMatch) => {
        if (isMatch && !compareErr) {
          if (account.isActivated) {
            const token = jwt.sign(account.toObject(), databaseConfig.secret, { expiresIn: '2h' });
            const tokenString = `JWT ${token}`;
            res.json({
              success: true,
              token: tokenString,
            });
          } else {
            res.status(400).json({
              success: false,
              msg: 'Authentication failed. Account needs to be activated',
            });
          }
        } else {
          res.status(401).json({
            success: false,
            msg: 'Authentication failed. Wrong password.',
          });
        }
      });
    }
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.json({
    loggedOut: true,
  });
});

router.post('/register', (req, res, next) => {
  const { userName, password, phoneNumber } = req.body;
  if (!userName || !password) {
    res.status(400).json({
      created: false,
      msg: 'Please pass username and password.',
    });
  } else {
    Account.findOne({
      userName,
    }, (err, account) => {
      if (err) throw err;

      if (!account) {
        const newAccount = new Account({
          userName,
          password,
          phoneNumber,
          isActivated: true,
        });
        // save the user
        newAccount
          .save()
          .then((doc) => {
            res.status(201).json({
              created: true,
              msg: 'Successful created new user.',
            });
          })
          .catch((saveAccountErr) => {
            res.status(400).json({
              created: false,
              msg: saveAccountErr,
            });
          });
      } else {
        res.status(400).json({
          created: false,
          msg: 'User already existed.',
        });
      }
    });
  }
});

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const {
    userName, password, phoneNumber, oldPassword,
  } = req.body;
  if (!userName) {
    res.status(400).json({
      created: false,
      msg: 'Please pass username',
    });
  } else {
    Account.findOne({
      userName,
    }, (err, account) => {
      if (err) throw err;

      if (account) {
        const toUpdate = account;

        if (oldPassword && password) {
          account.comparePassword(oldPassword, (compareErr, isMatch) => {
            if (compareErr) {
              res.status(400).json({
                updated: false,
                msg: 'Old password is not correct.',
              });
            } else if (isMatch) {
              toUpdate.password = password;
            }
          });
        }

        toUpdate.phoneNumber = phoneNumber;
        // save the user
        toUpdate
          .save()
          .then((doc) => {
            res.status(200).json({
              updated: true,
              msg: 'Successful updated user.',
            });
          })
          .catch((saveAccountErr) => {
            res.status(400).json({
              updated: false,
              msg: saveAccountErr,
            });
          });

      } else {
        res.status(404).json({
          updated: false,
          msg: 'User not found.',
        });
      }
    });
  }
});

export default router;
