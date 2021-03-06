const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

const prs_controller = require('../controllers/prsController');

// Get PRs dashboard
router.get('/', ensureAuthenticated, prs_controller.get_dashboard);

// Get latest PRs
router.get('/latest', ensureAuthenticated, prs_controller.get_latest);

// Get latest PRs by Group
router.get('/latest/:group', ensureAuthenticated, prs_controller.get_latest_group)

// Get latest PRs based on exercise group
router.get('/select/:group', ensureAuthenticated, prs_controller.get_selected_prs);

// Post selected exercise
router.post('/select', ensureAuthenticated, prs_controller.post_select);

// Update exercise in group
router.post('/update/:group', ensureAuthenticated, prs_controller.post_update_pr);

// Add Pr
router.post('/add', ensureAuthenticated, prs_controller.post_add_pr);

router.post('/delete', ensureAuthenticated, prs_controller.post_delete_pr)




module.exports = router;