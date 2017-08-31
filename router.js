const express = require('express');
const passport = require('passport');

const UserController = require('./controllers/user');
const GabbleController = require('./controllers/gabble');

module.exports = function(app) {

  const userRouter = express.Router();
  const gabbleRouter = express.Router();


// Middleware to protect routes
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())

    return next();
    res.redirect('/');
  }

  userRouter.post('/login/', passport.authenticate('local-login', {
        successRedirect: '/gabble/home',
        failureRedirect: '/login/',
        failureFlash: true
    }));

    userRouter.get('/signup/', UserController.signup);
    userRouter.post('/signup/', passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup/',
      failureFlash: true
    }));


    userRouter.get('/', UserController.login);
    userRouter.get('/signup', UserController.signup);
    userRouter.get('/logout', UserController.logout);
    gabbleRouter.get('/home', isLoggedIn, GabbleController.home);
    gabbleRouter.get('/create', isLoggedIn, GabbleController.create);

  app.use('/', userRouter);
  app.use('/gabble/', gabbleRouter);
};