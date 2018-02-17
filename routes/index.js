import express from 'express';

const router = express.Router();

/* GET home page. */
router.get(['/'], (req, res, next) => {
  res.render('index', { title: 'Sample Site' });
});

router.get('/ping', (req, res) => {
  res.status(200).send('pong!');
});

router.get('/healthcheck', (req, res, next) => {
  res.status(200).json({ health: 'ok' });
});


export default router;
