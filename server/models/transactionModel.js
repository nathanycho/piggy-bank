const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userID: {type: String, required: true},
  date: {type: Date, required: true},
  subject: {type: String, required: true},
  type: {type: String, required: true},
  category: {type: String, required: true},
  amount: {type: Number, required: true},
  notes: {type: String},
});

module.exports = mongoose.model('transactions', transactionSchema);
