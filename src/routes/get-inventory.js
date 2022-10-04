const Router = require('express');
const inventory = require('../services/inventory');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(inventory.getInventory(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
