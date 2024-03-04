function authenticateUser(req, res, next) {
  if (req.session.logged_in) {
    console.log(req.session);
    next();
} else {
    res.redirect('/login');
  }
}
module.exports = { authenticateUser };