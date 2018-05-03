const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.post_user_register = (req, res) => {
  res.send('User Registered Works');
  console.log(req.body);
};

exports.post_user_login = (req, res, next) => {
  res.send('User Login Works');
  console.log(req.body);
};

exports.post_user_logout = (req, res) => {

}