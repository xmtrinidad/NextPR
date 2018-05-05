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

exports.get_select_prs = (req, res) => {
  res.render('prs/select');
};

exports.get_selected_prs = (req, res) => {
  // Find user PRs
  Pr.find({ user_id: req.user._id })
    .populate('exercise_id')
    .exec((err, prs) => {
      if (err) throw err;
      // Filter PRs based on selected muscle group paramter
      const filtered = prs.filter(pr => pr.exercise_id.group === req.params.group);
      res.render('prs/cards', { group: req.params.group, prs: filtered });
    });
};

exports.post_select = (req, res) => {
  res.redirect(`/prs/select/${req.body.group}`);
};

exports.post_update_pr = (req, res) => {
  Pr.findOne({ _id: req.body.pr_id }, (err, pr) => {
    pr.reps = req.body.reps;
    pr.weight = req.body.weight;
    pr.save((err) => {
      if (err) throw err;
      res.redirect(`/prs/select/${req.params.group}`);
    });
  });
};

exports.post_add_pr = (req, res) => {
  const newExercise = new Exercise({
    name: req.body.exercise,
    group: req.body.group
  });

  newExercise.save((err, exercise) => {
    if (err) throw err;

    const newPr = new Pr({
      user_id: req.user._id,
      exercise_id: exercise._id,
      reps: req.body.reps,
      weight: req.body.weight
    });

    newPr.save((err, pr) => {
      if (err) throw err;
      res.redirect(`/prs/select/${req.body.group}`);
    })
  });
};