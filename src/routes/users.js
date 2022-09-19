const Router = require('express');
const signIn = require('../services/users');

const router = Router();

router.post('/', (req, res, next) => {
  try {
    res.json(signIn.validateUser(req.body));
  } catch (err) {
    console.error('Error while getting login ', err.message);
    next(err);
  }
});

module.exports = router;
