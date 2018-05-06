const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

// Get main/index 
router.get('/', index_controller.get_index);

// Undefind route redirect
router.get('*', index_controller.get_undefined_redirect);

module.exports = router;