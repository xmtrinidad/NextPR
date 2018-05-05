const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

const prs_controller = require('../controllers/prsController');

// Get PRs dashboard
router.get('/', ensureAuthenticated, prs_controller.get_dashboard);

// Get latest PRs
router.get('/latest', ensureAuthenticated, prs_controller.get_latest);

// Get select exercise form to add
router.get('/add/select', ensureAuthenticated, prs_controller.get_add_select_prs);

// Get latest PRs based on exercise group
router.get('/add/:group', ensureAuthenticated, prs_controller.get_add_prs);

// Post selected exercise
router.post('/add/select', ensureAuthenticated, prs_controller.post_add_select);

// Update exercise in group
router.post('/update/:group', ensureAuthenticated, prs_controller.post_update_pr);




module.exports = router;