const { Transaction } = require('../../models/transaction');

const getExpense = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;

  const { startDate, endDate } = req.body; // must come in format 2021-11-10T00:00:00.000Z
  const startPoint = new Date(startDate).getTime();
  const endPoint = new Date(endDate).getTime();

  const filter = { owner: _id, type: 'expense' };
  const transactions = await Transaction.find(filter, '', {
    skip,
    limit: +limit,
  })
    .sort([['date', -1]])
    .populate('owner', 'email');

  const result = transactions.filter(transaction => {
    const transactionTime = new Date(transaction.date).getTime();
    return transactionTime >= startPoint && transactionTime <= endPoint;
  });

  console.log(result);
  res.json({
    status: 'success',
    code: 200,
    result,
    quantity: result.length,
  });
};

module.exports = getExpense;
