// This module enables access to the recipe data, sending HTTP requests to the API endpoint.
// Axios is used to simplify the HTTP interactions. Very little logic is required but having
// requests performed here, rather than in the controller, allows for easier testing.

const axios = require('axios');

const createRecipe = async (recipe) => axios.post(`http://localhost:3002/recipes`, recipe);

const deleteRecipe = async (id) => axios.delete(`http://localhost:3002/recipes/${id}`);

const getRecipes = async (searchTerm) => {
  const searchUrlPart = searchTerm ? `search=${searchTerm}` : '';
  return axios.get(`http://localhost:3002/recipes${searchUrlPart}`);
};

const getRecipe = async (id) => axios.get(`http://localhost:3002/recipes/${id}`);

const updateRecipe = async (id, recipe) => axios.put(`http://localhost:3002/recipes/${id}`, recipe);

module.exports = {
  createRecipe,
  deleteRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
};
