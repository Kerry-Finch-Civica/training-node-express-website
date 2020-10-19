// There is some logic in this module but input validation should also go here

const recipeConnector = require('../connectors/recipe.connector');
const recipeStepConnector = require('../connectors/recipe-step.connector');

// Formats the posted data before passing to the connector
const createRecipe = async (recipe) => {
  const response = await recipeConnector.createRecipe(recipe);
  const { lastID } = response.data;

  // Recipe instructions are split into their composite steps
  const recipeSteps = recipe.recipe_steps
    .split(/[\r\n]+/)
    .map((p, i) => {
      return { step_number: i + 1, step_text: p };
    })
    // .filter((p) => !p.match(/\s*/));
  await recipeStepConnector.updateRecipeSteps(lastID, recipeSteps);
};

const deleteRecipe = async (id) => recipeConnector.deleteRecipe(id);

const formatDescription = (description) => {
  return `${description.substring(0, 50) }...`
}

const formatPrepTime = (time) => {
if (time < 60) {
  return `${time} minutes`
}
else if (time < 120) {
  return `1 hour and ${time % 60} minutes`
}
else {
  return `${Math.floor(time/60)} hours and ${time%60} minutes`
}
}

// Get the recipe data and formats for viewing
const getRecipes = async (searchTerm) =>
  (await recipeConnector.getRecipes(searchTerm)).data.map((recipe) => {
    return { ...recipe, short_description: formatDescription(recipe.short_description) , preparation_time: formatPrepTime(recipe.preparation_time)};
  });



const getRecipe = async (id) => {
  const recipe = await recipeConnector.getRecipe(id);
  return { recipe: recipe.data };
};

const updateRecipe = async (id, recipe) => recipeConnector.updateRecipe(id, recipe);

module.exports = {
  createRecipe,
  deleteRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
};
