const Session = require('../models/sessionModel');

const sessionController = {};

// ===================================================
// Checks if a session is already created for user
// ===================================================
sessionController.isLoggedIn = (req, res, next) => {
  const ssid = req.cookies.ssid;
  Session.find({cookieId : ssid})
    .then((data) => {
      if(data.length === 0) {
        return res.redirect('/');
      }
      else {
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: `isLoggedIn in sessionController: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in isLoggedIn method of sessionController.',
        },
      })
    });
};

// ===================================================
// Checks if a session is already created for user
// ===================================================
sessionController.isLoggedInHome = (req, res, next) => {
  const ssid = req.cookies.ssid;
  Session.find({cookieId : ssid})
    .then((data) => {
      console.log(data);
      if(data.length === 0) {
        return next();
      }
      else {
        return res.redirect('/dashboard');
      }
    })
    .catch((err) => {
      return next({
        log: `isLoggedIn in sessionController: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in isLoggedIn method of sessionController.',
        },
      })
    });
};

// ===================================================
// Creates and saves a new session
// ===================================================
sessionController.startSession = (req, res, next) => {
  const userID = res.locals.user._id;
  Session.create({cookieId: userID}, (err, cookie) => {
    if (err) {
      return next({
        log: `startSession in sessionController: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in startSession method of sessionController.',
        },
      })
    }
    else {
      return next();
    }
  })
    
};

module.exports = sessionController;
