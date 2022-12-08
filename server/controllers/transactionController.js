const Transaction = require('../models/transactionModel');
const transactionController = {};


// ===================================================
// Pulls all transactions in DB
// ===================================================
transactionController.getAllTransactions = (req, res, next) => {
  const userID = req.cookies.ssid;
  Transaction.find({ userID }, (err, transactions) => {
    if (err) return next({
      log: `getAllTransactions in transactionController: ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message: {
        err: 'Error occurred in getAllTransactions method of transactionController.',
      },
    });
    res.locals.transactions = transactions;
    return next();
  });
};


// ===================================================
// Creates a transaction
// ===================================================
transactionController.createTransaction = (req, res, next) => {
  const userID = req.cookies.ssid;
  const { date, subject, type, category, amount, notes } = req.body;
  Transaction.create({ userID, date, subject, type, category, amount, notes }, (err, transaction) => {
    if (err) {
      return next({
        log: `createTransaction in transactionController: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in createTransaction method of transactionController.',
        },
      });
    }
    res.locals.transaction = transaction;
    return next();
  });
};

// ===================================================
// Deletes a transaction
// ===================================================
transactionController.deleteTransaction = (req, res, next) => {
  console.log(req.body);
  const { _id } = req.body;
  Transaction.deleteOne({ _id }, (err, transaction) => {
    if (err) {
      return next({
        log: `deleteTransaction in transactionController: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in deleteTransaction method of transactionController.',
        },
      });
    }
    res.locals.transaction = transaction;
    return next();
  });
};


module.exports = transactionController;
