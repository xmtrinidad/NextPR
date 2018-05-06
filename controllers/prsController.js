const Exercise = require('../models/Exercise');
const Pr = require('../models/Pr');

exports.get_dashboard = (req, res) => {
  res.render('prs');
};


// Get all PRs by the authenticated user
exports.get_latest = (req, res) => {
  Pr.find({ user_id: req.user._id })
    .populate('exercise_id')
    .exec((err, prs) => {
      if (err) return err;
      res.render('prs/latest', { prs: prs });
    });
};

// Get PRs by group for authenticated user
exports.get_latest_group = (req, res) => {
  Pr.find({ user_id: req.user._id })
    .populate('exercise_id')
    .exec((err, prs) => {
      if (err) return err;
      const filteredPrs = prs.filter(pr => pr.exercise_id.group === req.params.group);
      res.render('prs/latest', { prs: filteredPrs });
    });


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

// Add new pr
exports.post_add_pr = (req, res) => {
  const submittedExercise = req.body.exercise.toLowerCase().trim();
  // Check if exercise already exist
  Exercise.findOne({ name: submittedExercise })
    .then(exercise => {
      if (exercise) {
        req.flash('error_msg', 'Exercise already exist');
        res.redirect(`/prs/select/${req.body.group}`);
      } else {
        // Create new Exercise
        const newExercise = new Exercise({
          name: submittedExercise,
          group: req.body.group
        });

        // Save the Exercise in order to use it to create a new PR
        newExercise.save((err, exercise) => {
          if (err) throw err;

          // Create new PR
          const newPr = new Pr({
            user_id: req.user._id,
            exercise_id: exercise._id,
            reps: req.body.reps,
            weight: req.body.weight
          });

          // Save new PR
          newPr.save((err, pr) => {
            if (err) throw err;
            res.redirect(`/prs/select/${req.body.group}`);
          })
        });
      }
    });
};

exports.post_delete_pr = (req, res) => {
  Pr.findOne({ _id: req.body.pr })
    .remove((err) => {
      if (err) throw err;
      Exercise.findOne({ _id: req.body.exercise })
        .remove((err, exercise) => {
          if (err) throw err;
          res.redirect(`/prs/select/${req.body.group}`);
        })
    })
}