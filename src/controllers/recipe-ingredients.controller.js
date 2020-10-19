const recipeIngredientConnector = require('../connectors/recipe-ingredients.connector');

const createRecipeIngredient = async (recipeIngredient) => recipeIngredientConnector.createRecipeIngredient(recipeIngredient);

const deleteRecipeIngredient = async (id) => recipeIngredientConnector.deleteRecipeIngredient(id);

const getRecipeIngredients = async (recipeId) => recipeIngredientConnector.getRecipeIngredient(recipeId);

const getRecipeIngredient = async (id) => recipeIngredientConnector.getRecipeIngredient(id);

module.exports = {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getRecipeIngredients,
  getRecipeIngredient,
};