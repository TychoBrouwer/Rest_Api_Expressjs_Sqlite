const Router = require('express');
const newClientSalt = require('../services/new-client-salt');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(newClientSalt.set(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
