// Get dependencies
require('dotenv').config();
const express = require('express');
const winston = require('winston');
const path = require('path');
const logger = require('./utils/logger');
const recipeRouter = require('./routes/recipe.route');
// const recipeStepRouter = require('./routes/recipe-step.route');
const errorHandler = require('./utils/error-handler');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

winston.add(new winston.transports.Console(), {
  level: 'debug',
  showLevel: true,
});

app.use(express.json()); // support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // support URL-encoded bodies
app.use(logger.logger);

app.use('/recipes', recipeRouter);
// app.use('/recipes', recipeStepRouter);

app.use(logger.logger);
app.use(errorHandler.handler);

module.exports = { app };
