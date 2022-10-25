const Router = require('express');
const inventory = require('../services/bar-code');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(inventory.getBarCode(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
