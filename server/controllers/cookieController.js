const cookieController = {};

// ===================================================
// Set SSID Cookie
// ===================================================
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('hi', 'hello');
  const userID = `${res.locals.user._id}`;
  res.cookie('ssid', userID);
  return next();
}

module.exports = cookieController;
