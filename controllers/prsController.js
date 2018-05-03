exports.get_dashboard = (req, res) => {
  res.render('prs');
};

exports.get_add_pr = (req, res) => {
  res.render('prs/add');
};