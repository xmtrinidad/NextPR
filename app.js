const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


// Routes
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const prsRoutes = require('./routes/prs');

// Initialize Express
const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to mongoose
mongoose.connect('mongodb://localhost/nextpr')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Express JSON Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static folder middleware
app.use(express.static(path.join(__dirname, 'public')))

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes Middleware
app.use('/prs', prsRoutes);
app.use('/users', usersRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));