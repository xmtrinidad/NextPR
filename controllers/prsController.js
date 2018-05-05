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

exports.get_add_select_prs = (req, res) => {
  res.render('prs/select');
};

exports.get_add_prs = (req, res) => {
  // Find user PRs
  Pr.find({ user_id: req.user._id })
    .populate('exercise_id')
    .exec((err, prs) => {
      if (err) throw err;
      // Filter PRs based on selected muscle group paramter
      const filtered = prs.filter(pr => pr.exercise_id.group === req.params.group);
      res.render('prs/add', { group: req.params.group, prs: filtered });
    });
};

exports.post_add_select = (req, res) => {
  res.redirect(`/prs/add/${req.body.group}`);
};

exports.post_update_pr = (req, res) => {
  Pr.findOne({ _id: req.body.pr_id }, (err, pr) => {
    pr.reps = req.body.reps;
    pr.weight = req.body.weight;
    pr.save((err) => {
      if (err) throw err;
      res.redirect(`/prs/add/${req.params.group}`);
    });
  });
};