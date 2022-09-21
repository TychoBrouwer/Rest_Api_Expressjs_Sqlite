const Router = require('express');
const getClientSalt = require('../services/get-client-salt');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(getClientSalt.get(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
