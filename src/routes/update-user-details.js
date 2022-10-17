const Router = require('express');
const user = require('../services/user');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(user.updateUserDetails(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
