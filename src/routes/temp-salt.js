const Router = require('express');
const newClientSalt = require('../services/temp-salt');

const router = Router();

router.post('/', (req, res, next) => {
  try {
    res.json(newClientSalt.set(req.body));
  } catch (err) {
    console.error('Error while getting login ', err.message);
    next(err);
  }
});

module.exports = router;
