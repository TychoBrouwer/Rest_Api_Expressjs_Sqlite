const Router = require('express');
const signUp = require('../services/sign-up');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(signUp.createUser(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
