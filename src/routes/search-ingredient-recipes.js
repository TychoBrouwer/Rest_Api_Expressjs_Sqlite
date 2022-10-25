const Router = require('express');
const groups = require('../services/recipes');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(groups.searchIngredientRecipe(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
