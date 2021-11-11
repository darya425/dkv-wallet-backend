const express = require('express');
const router = express.Router();
const { categories } = require('../../controllers');
const { controllerWrapper, authenticate } = require('../../middlewares');

router.get('/expense', authenticate, controllerWrapper(categories.getExpenseCategories));

router.get('/income', authenticate, controllerWrapper(categories.getIncomeCategories));

module.exports = router;
