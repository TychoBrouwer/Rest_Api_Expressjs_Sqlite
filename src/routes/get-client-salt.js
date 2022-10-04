const Router = require('express');
const clientSalt = require('../services/client-salt');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(clientSalt.get(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
