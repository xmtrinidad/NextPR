const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

const prs_controller = require('../controllers/prsController');

// Get PRs dashboard
router.get('/', ensureAuthenticated, prs_controller.get_dashboard);

// Get latest PRs
router.get('/latest', ensureAuthenticated, prs_controller.get_latest);

// Get add PRs
router.get('/add', ensureAuthenticated, prs_controller.get_add_prs);



module.exports = router;