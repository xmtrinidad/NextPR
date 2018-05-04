const Exercise = require('../models/Exercise');
const Pr = require('../models/Pr');

exports.get_dashboard = (req, res) => {
  res.render('prs');
};


exports.get_latest = (req, res) => {
  // Find PRs by the authenticated user id
  Pr.find({ user_id: req.user._id })
    .populate('exercise_id')
    .exec((err, prs) => {
      if (err) return err;
      res.render('prs/latest', { prs: prs });
    });
};

exports.get_add_prs = (req, res) => {
  res.render('prs/add');
};