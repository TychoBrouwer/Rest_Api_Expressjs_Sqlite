const db = require('../utils/recipes-db');

function searchIngredientRecipe(ingredients, limit) {
  let query = `
    SELECT *
    FROM recipes_ingredients
    JOIN ingredients On recipes-ingredients.fk_ingredient = ingredients.ingredient_ID
    JOIN recipes On recipes_ingredients.fk_recipe = recipes.recipe_ID
    WHERE 
  `;

  for (let i = 0; i < Math.max(ingredients.length, limit); i += 1) {
    query += 'ingredients.ingredient_name = ? ';
  }

  let queryResult;

  try {
    queryResult = db.query(query, ingredients);

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
