const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};


userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};


// ===================================================
// Creates User when Sign Up
// ===================================================
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.create({ username, password }, (err, user) => {
    if (err) {
      return next({
        log: `createUser in userController: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in createUser method of userController.',
        },
      });
    }
    // res.locals.user = user;
    return next();
  });
};


// ===================================================
// Verifies User when Log in
// ===================================================
userController.verifyUser = (req, res, next) => {    
  User.findOne({ username: req.body.username })
  .then((data) => {
    if (!data) {
      console.log('username not found');
      // Add functionality of "invalid login; username doesn't exist"
      // document.addEventListener('DOMContentLoaded', (event) => {
      //   document.getElementById('loginFail').style.visibility = "visible";
      // });
      return res.redirect('/signup');
      }
      bcrypt.compare(req.body.password, data.password)
        .then((result) => {
          if (!result) {
            console.log('password not found');
            return res.redirect('/'); // add functionality of "invalid login; password"
          }
          else {
            // res.locals.user = data;
            return next();
          }
        })
        .catch((err) => next({
          log: `verifyUser in userController: ERROR: ${
            typeof err === 'object' ? JSON.stringify(err) : err
          }`,
          message: {
            err: 'Error occurred in bcrypt compare of verifyUser method of userController.',
          },
        }));
    })
    .catch((err) => next({
      log: `createUser in userController: ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message: {
        err: 'Error occurred in DB find of createUser method of userController.',
      },
    }));
};

module.exports = userController;
