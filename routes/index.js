import express from 'express';

const router = express.Router();

/* GET home page. */
router.get(['/', '/login', '/register', '/export', '/import', '/inspect', '/inspect/new-product', '/contacts'], (req, res, next) => {
  res.render('index', { title: 'Shop organize tool' });
});

router.get('/ping', (req, res) => {
  res.status(200).send('pong!');
});

router.get('/healthcheck', (req, res, next) => {
  res.status(200).json({ health: 'ok' });
});

export default router;

export { default as apiRouter } from './api';
