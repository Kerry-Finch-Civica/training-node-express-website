const express = require('express');
const recipeStepController = require('../controllers/recipe-step.controller');
const recipeIngredientController = require('../controllers/recipe-ingredients.controller');
const recipeController = require('../controllers/recipe.controller');
const { CustomException, NotFoundException } = require('../utils/errors');

const router = express.Router();

// Renders the create page from the view template
router.get('/create', async (req, res) => {
  res.render('create');
});

router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    res.render('delete', recipe);
  } catch (err) {
    next(err);
  }
});


// Accepts the data submitted from the create page and calls the controller to persist it
router.post('/create', async (req, res, next) => {
  try {
    await recipeController.createRecipe(req.body);
    res.redirect('/recipes'); // Redirect to the list of recipes upon successful creation
  } catch (err) {
    next(new CustomException('Unable to create recipe', err));
  }
});

// Accepts the data submitted from the edit page and calls the controller to persist it
router.post('/:id/edit', async (req, res, next) => {
  try {
    await recipeController.updateRecipe(req.params.id, req.body);
    res.redirect('/recipes'); // Redirect to the list of recipes upon successful creation
  } catch (err) {
    next(new CustomException('Unable to update recipe', err));
  }
});

// Calls the controller to delete the recipe corresponding to the ID in the URL
router.post('/:id/delete', async (req, res) => {
  try {
    await recipeController.deleteRecipe(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    next(new CustomException('Unable to delete recipe', err));
  }
});

// Renders the index page from the template with the data filtered by the search query parameter
router.get('/', async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const result = await recipeController.getRecipes(searchTerm);
    res.status(200).render('index', { recipes: result });
  } catch (err) {
    next(new CustomException('Unable to get recipes', err));
  }
});

// Gets a recipe by the ID supplied in the URL and renders the view page
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    const result = await recipeStepController.getRecipeSteps(req.params.id);
    if (!result) {
      throw new NotFoundException('recipe steps not found');
    }
    const result2 = await recipeIngredientController.getRecipeIngredients(req.params.id);
    if (!result2) {
      throw new NotFoundException('recipe ingredients not found');
    }
    res.render('view', {...recipe, steps: result, ingredients: result2}); 
    // res.render('view', recipe);
  } catch (err) {
    next(err);
  }
});

// Gets a recipe by the ID supplied in the URL and renders the edit page
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    res.render('edit', recipe);
  } catch (err) {
    next(err);
  }
});

// Updates a recipe according to the ID supplied in the URL
router.put('/:id', async (req, res) => {
  res.send(await recipeController.updateRecipe(req.params.id, req.body));
});

// Gets a recipe by the ID supplied in the URL and renders the addStep page
router.get('/:id/addStep', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    res.render('addStep', recipe);
  } catch (err) {
    next(err);
  }
});

// Accepts the data submitted from the addStep page and calls the controller to persist it
router.post('/:id/addStep', async (req, res, next) => {
  try {
    await recipeStepController.createRecipeStep(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`); // Redirect to the recipe upon successful creation
  } catch (err) {
    next(new CustomException('Unable to create recipe step', err));
  }
});

// Gets a recipe by the ID supplied in the URL and renders the addIngredient page
router.get('/:id/addIngredient', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    res.render('addIngredient', recipe);
  } catch (err) {
    next(err);
  }
});

// Accepts the data submitted from the addIngredient page and calls the controller to persist it
router.post('/:id/addIngredient', async (req, res, next) => {
  try {
    await recipeIngredientController.createRecipeIngredient(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`); // Redirect to the recipe upon successful creation
  } catch (err) {
    next(new CustomException('Unable to create recipe ingredient', err));
  }
});

// Gets a recipe by the ID supplied in the URL and renders the editStep page
router.get('/:id/editStep/:step', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    const result = await recipeStepController.getRecipeStep(req.params.step);
    if (!result) {
      throw new NotFoundException('recipe steps not found');
    }
    res.render('editStep', {...recipe, step: result}); 
  } catch (err) {
    next(err);
  }
});

module.exports = router;
