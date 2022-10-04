const Router = require('express');
const groups = require('../services/groups');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(groups.addToGroup(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
