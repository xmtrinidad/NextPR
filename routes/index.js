const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

// Get main/index 
router.get('/', index_controller.get_index);

// Get about
router.get('/about', index_controller.get_about);

// Undefind route redirect
router.get('*', function (req, res) {
  res.redirect('/prs')
});

module.exports = router;