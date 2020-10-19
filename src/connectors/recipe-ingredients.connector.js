// This module enables access to the recipe ingredients data, sending HTTP requests to the API endpoint.
// Axios is used to simplify the HTTP interactions. Very little logic is required but having
// requests performed here, rather than in the controller, allows for easier testing.

const axios = require('axios');

const updateRecipeIngredients = async (recipeId, recipeIngredients) => {
  return axios.patch(`http://localhost:3002/recipes/${recipeId}/recipe-ingredients`, recipeIngredients);
};

module.exports = {
  updateRecipeIngredients,
};