exports.get_dashboard = (req, res) => {
  res.render('prs', { username: req.user.username });
};

exports.get_latest = (req, res) => {
  res.render('prs/latest');
};

exports.get_add_prs = (req, res) => {
  res.render('prs/add');
};