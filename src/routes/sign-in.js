const Router = require('express');
const signIn = require('../services/sign-in');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(signIn.authUser(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
