const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.post_user_register = (req, res) => {
  let errors = [];

  if (req.body.password !== req.body.password_confirm) {
    errors.push({ text: 'Passwords do not match.' });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters' });
  }
  if (errors.length > 0) {
    // There are validation errors, render index with messages
    res.render('index', {
      errors: errors,
      name: req.body.name,
      email: req.body.email
    });
  } else {
    // Check if username already exist
    User.findOne({ email: req.body.email })
      .then(user => {
        // There is a user with that email
        if (user) {
          req.flash('error_msg', 'Email already registered');
          res.redirect('/');
        } else {
          // Email doesn't exist, create new user
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
          // Hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              // Save new user with hashed password
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
};

exports.post_user_login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/prs',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
};

exports.post_user_logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
}