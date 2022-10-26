const Router = require('express');
const recipes = require('../services/recipes');

const router = Router();

router.post('/', (req, res) => {
  try {
    res.json(recipes.searchRecipe(req.body));
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
