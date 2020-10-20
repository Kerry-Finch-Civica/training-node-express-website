// This module enables access to the recipe steps data, sending HTTP requests to the API endpoint.
// Axios is used to simplify the HTTP interactions. Very little logic is required but having
// requests performed here, rather than in the controller, allows for easier testing.

const axios = require('axios');

const updateRecipeSteps = async (recipeId, recipeSteps) => {
  return axios.patch(`http://localhost:3002/recipes/${recipeId}/recipe-steps`, recipeSteps);
};

const getRecipeSteps = async (recipeId) => {
  return axios.get(`http://localhost:3002/recipes/${recipeId}/recipe-steps`);
};

const getRecipeStep = async (recipeId, recipeStepId) => {
  return axios.get(`http://localhost:3002/recipes/${recipeId}/recipe-steps/${recipeStepId}`)
}

const createRecipeStep = async (recipeStep) => axios.post(`http://localhost:3002/recipes/${recipeStep.recipe_id}/recipe-steps`, recipeStep);

module.exports = {
  updateRecipeSteps,
  getRecipeSteps,
  getRecipeStep,
  createRecipeStep,
};
