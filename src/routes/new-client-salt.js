const Router = require('express');
const newClientSalt = require('../services/new-client-salt');

const router = Router();

router.post('/', (req, res, next) => {
  try {
    console.log('test');
    res.json(newClientSalt.set(req));
  } catch (err) {
    console.error('Error while getting login ', err.message);
    next(err);
  }
});

module.exports = router;
