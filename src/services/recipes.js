const db = require('../utils/recipes-db');

function searchIngredientRecipe({ ingredients, limit }) {
  let query = `
    SELECT *
    FROM recipes_ingredients
    JOIN ingredients On recipes-ingredients.fk_ingredient = ingredients.ingredient_ID
    JOIN recipes On recipes_ingredients.fk_recipe = recipes.recipe_ID
    WHERE 
  `;
  console.log(ingredients);

  for (let i = 0; i < Math.max(ingredients.length, limit); i += 1) {
    console.log(ingredients.length);
    query += 'ingredients.ingredient_name = ? ';
  }

  console.log(query);

  let queryResult;

  try {
    queryResult = db.query(query, ingredients);
    console.log(queryResult);

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
