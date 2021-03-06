module.exports = async function bulkImport(root, { transactions }, context) {
  await context.requireAuthorization();
  return Promise.all(
    transactions.map(({ date, description, accounts: splits }) =>
      context.dbal.transactions.createTransaction(date, description, splits),
    ),
  ).then(() => true);
};
