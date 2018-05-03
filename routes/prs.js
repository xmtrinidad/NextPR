const express = require('express');
const router = express.Router();

const prs_controller = require('../controllers/prsController');

// Get PRs dashboard
router.get('/', prs_controller.get_dashboard);

// Get Add PR
router.get('/add', prs_controller.get_add_pr)

module.exports = router;