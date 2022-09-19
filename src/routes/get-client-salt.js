const Router = require('express');
const getClientSalt = require('../services/get-client-salt');

const router = Router();

router.post('/', (req, res, next) => {
  try {
    res.json(getClientSalt.get(req.body));
  } catch (err) {
    console.error('Error while getting login ', err.message);
    next(err);
  }
});

module.exports = router;
