const { Transaction } = require('../../models/transaction');

const getAllTransactions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const filter = { owner: _id };
  const transactions = await Transaction.find(filter, '', { skip, limit: +limit }).populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    transactions,
    quantity: transactions.length
  });
};

module.exports = getAllTransactions;
