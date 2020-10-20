// There is currently no real logic in this module but input validation should go here

const recipeStepConnector = require('../connectors/recipe-step.connector');

const createRecipeStep = async (recipeId, recipeStep) => {
  await recipeStepConnector.createRecipeStep({recipe_id: recipeId, ...recipeStep});
};

const deleteRecipeStep = async (id) => recipeStepConnector.deleteRecipeStep(id);

// const getRecipeSteps = async (recipeId) => recipeStepConnector.getRecipeSteps(recipeId);

const getRecipeSteps = async (recipeId) =>
  (await recipeStepConnector.getRecipeSteps(recipeId)).data.map((recipeSteps) => {
    return {step_number: recipeSteps.step_number , step_text: recipeSteps.step_text};
  });

const getRecipeStep = async (id) => recipeStepConnector.getRecipeStep(id);

module.exports = {
  createRecipeStep,
  deleteRecipeStep,
  getRecipeSteps,
  getRecipeStep,
};
