const exposeUsers = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    res.locals.isLoggedIn = true;
  }

  console.log("Inside exposeUsers");
  next();
};

module.exports = exposeUsers;
