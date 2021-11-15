const express = require('express');
const router = express.Router();
const { transactions } = require('../../controllers');
const { controllerWrapper, validation, authenticate } = require('../../middlewares');
const { joiSchema } = require('../../models/transaction');

router.post('/', authenticate, validation(joiSchema), controllerWrapper(transactions.addTransaction));

router.get('/', authenticate, controllerWrapper(transactions.getAllTransactions));

router.get('/statistics', authenticate, controllerWrapper(transactions.getStatistics));

module.exports = router;
