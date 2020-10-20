const recipeIngredientConnector = require('../connectors/recipe-ingredients.connector');

const createRecipeIngredient = async (recipeId, recipeIngredient) => {
  await recipeIngredientConnector.createRecipeIngredient({recipe_id: recipeId, ...recipeIngredient});
};

const deleteRecipeIngredient = async (id) => recipeIngredientConnector.deleteRecipeIngredient(id);

const getRecipeIngredients = async (recipeId) =>   
(await recipeIngredientConnector.getRecipeIngredients(recipeId)).data.map((recipeIngredients) => {
    return {name: recipeIngredients.name};
  });

const getRecipeIngredient = async (id) => recipeIngredientConnector.getRecipeIngredient(id);

module.exports = {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getRecipeIngredients,
  getRecipeIngredient,
};