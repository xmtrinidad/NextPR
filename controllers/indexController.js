exports.get_index = (req, res) => {
  res.render('index');
};

exports.get_undefined_redirect = (req, res) => {
  res.redirect('/prs');
};