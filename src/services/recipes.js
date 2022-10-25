const db = require('../utils/recipes-db');

function searchIngredientRecipe({ ingredients, limit }) {
  let query = `
    SELECT *
    FROM recipes_ingredients
    JOIN ingredients ON recipes_ingredients.fk_ingredient = ingredients.ingredient_ID
    JOIN recipes ON recipes_ingredients.fk_recipe = recipes.recipe_ID
    LIMIT ?
    WHERE 
  `;
  console.log(ingredients);

  for (let i = 0; i < ingredients.length; i += 1) {
    console.log(ingredients.length);
    query += 'ingredients.ingredient_name = ? ';
  }

  console.log(query);

  let queryResult;

  try {
    queryResult = db.query(query, [limit, ...ingredients]);
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
