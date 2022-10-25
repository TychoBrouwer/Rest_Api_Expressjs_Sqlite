const Router = require('express');
const barCode = require('../services/bar-code');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(barCode.addBarCode(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
