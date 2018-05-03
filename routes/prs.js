const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

const prs_controller = require('../controllers/prsController');

// Get PRs dashboard
router.get('/', ensureAuthenticated, prs_controller.get_dashboard);

// Get Add PR
router.get('/add', ensureAuthenticated, prs_controller.get_add_pr)

module.exports = router;