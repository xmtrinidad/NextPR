exports.get_dashboard = (req, res) => {
  res.render('prs', { username: req.user.username });
};

exports.get_add_pr = (req, res) => {
  res.render('prs/add');
};