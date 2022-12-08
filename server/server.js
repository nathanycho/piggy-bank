const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3000;
const app = express();

const MONGO_URI = 'mongodb+srv://nathanycho:M5hrLefIhedrww0F@budget-app.mpwexuk.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'piggy'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// ===================================================
// Routers
// ===================================================

// ===================================================
// Controllers
// ===================================================
const userController = require('./controllers/userController');
const transactionController = require('./controllers/transactionController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

// ===================================================
// Request Body Parsing
// ===================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions ={
  origin:'http://localhost:8080', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// ===================================================
// Serve Static Files
// ===================================================
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/build', express.static(path.resolve(__dirname, '../build')));

// ===================================================
// GET Route Handlers
// ===================================================

app.get('/transactions', transactionController.getAllTransactions, (req, res) => {
  return res.status(200).json(res.locals.transactions);
});

// ===================================================
// POST Route Handlers
// ===================================================

app.post('/signup/success', userController.createUser, (req, res) => {
  return res.redirect('/');
});

app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  return res.redirect('/dashboard');
});

app.post('/transactions/input', transactionController.createTransaction, (req, res) => {
  return res.redirect('/transactions');
});

// ===================================================
// DELETE Route Handlers
// ===================================================

app.delete('/transactions', transactionController.deleteTransaction, (req, res) => {
  return res.status(200).json(res.locals.transaction);
});

// ===================================================
// Catch-All 404 Handling
// ===================================================

app.get('*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

app.use((req, res) => res.status(404).send('Page Not Found!'));

// ===================================================
// Global Error Handler
// ===================================================

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// ===================================================
// Server Start
// ===================================================
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
