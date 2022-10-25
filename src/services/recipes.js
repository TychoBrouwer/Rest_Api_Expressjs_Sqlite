const db = require('../utils/recipes-db');
const sanitizeInput = require('../utils/sanitize-input');

function searchIngredientRecipe(data) {
  console.log(data);

  const {
    ingredients, limit,
  } = sanitizeInput(data);

  let query = `
    SELECT *
    FROM recipes_ingredients
    JOIN ingredients ON recipes_ingredients.fk_ingredient = ingredients.ingredient_ID
    JOIN recipes ON recipes_ingredients.fk_recipe = recipes.recipe_ID
    WHERE 
  `;
  console.log(ingredients);

  for (let i = 0; i < ingredients.length; i += 1) {
    query += 'ingredients.ingredient_name = ? ';
  }

  query += ' LIMIT ?';

  let queryResult;

  try {
    queryResult = db.query(query, [...ingredients, limit]);

    if (!queryResult[0]) {
      return [];
    }
  } catch (err) {
    console.log(err);
  }

  return queryResult;
}

module.exports = {
  searchIngredientRecipe,
};
