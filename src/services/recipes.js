const db = require('../utils/recipes-db');
const sanitizeInput = require('../utils/sanitize-input');

function searchRecipe(data) {
  let {
    // eslint-disable-next-line camelcase, prefer-const
    name, recipe_name,
  } = sanitizeInput(data);

  // eslint-disable-next-line camelcase
  name = name || recipe_name;

  const recipeQuery = `
    SELECT * 
    FROM recipes 
    WHERE recipes.recipe_name LIKE ?
  `;

  let queryResult;

  try {
    queryResult = db.query(recipeQuery, [`%${name}%`]);

    for (let i = 0; i < queryResult.length; i += 1) {
      const ingredientQuery = `
        SELECT quantity, quantity_unit, ingredient_name, ingredient_ID 
        FROM recipes_ingredients 
        JOIN ingredients ON recipes_ingredients.fk_ingredient = ingredients.ingredient_ID 
        WHERE fk_recipe = ?
      `;

      const queryIngredientResult = db.query(ingredientQuery, [queryResult[i].recipe_ID]);
      queryResult[i].ingredients = queryIngredientResult;
    }

    if (!queryResult[0]) {
      return [];
    }

    return queryResult;
  } catch (err) {
    console.log(err);

    return [];
  }
}

function searchIngredientRecipe(data) {
  const {
    ingredients, limit,
  } = sanitizeInput(data);

  let recipesQuery = `
    SELECT recipe_name 
    FROM recipes_ingredients
    JOIN ingredients ON recipes_ingredients.fk_ingredient = ingredients.ingredient_ID
    JOIN recipes ON recipes_ingredients.fk_recipe = recipes.recipe_ID
    WHERE 
  `;

  for (let i = 0; i < ingredients.length; i += 1) {
    recipesQuery += 'ingredients.ingredient_name = ? ';

    if (i !== ingredients.length - 1) {
      recipesQuery += 'OR ';
    }
  }

  recipesQuery += ' LIMIT ?';

  const result = [];

  try {
    const queryRecipesResult = db.query(recipesQuery, [...ingredients, limit]);

    // const recipeIDs = queryResult.map((recipe) => recipe.recipe_ID);
    for (let i = 0; i < queryRecipesResult.length; i += 1) {
      result.push(searchRecipe(queryRecipesResult[i])[0]);
    }

    if (!result[0]) {
      return [];
    }
  } catch (err) {
    console.log(err);
  }

  return result;
}

module.exports = {
  searchIngredientRecipe,
  searchRecipe,
};
