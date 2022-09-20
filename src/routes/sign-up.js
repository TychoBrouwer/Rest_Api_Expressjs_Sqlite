const Router = require('express');
const signUp = require('../services/sign-up');

const router = Router();

router.post('/', (req, res, next) => {
  try {
    res.json(signUp.createUser(req));
  } catch (err) {
    console.error('Error while creating user ', err.message);
    next(err);
  }
});

module.exports = router;
