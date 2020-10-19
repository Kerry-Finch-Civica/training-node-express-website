const express = require('express');
const recipeController = require('../controllers/recipe.controller');
const { CustomException, NotFoundException } = require('../utils/errors');

const router = express.Router();

// Renders the create page from the view template
router.get('/create', async (req, res) => {
  res.render('create');
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
router.delete('/:id', async (req, res) => {
  const result = await recipeController.deleteRecipe(req.params.id);
  res.send(result);
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
    res.render('view', recipe);
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

module.exports = router;
