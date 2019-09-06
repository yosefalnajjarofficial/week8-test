const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  // Check if the user has a cookie
  if (!req.cookies.access) {
    // If he doesn't then redirect him to '/'
    res.redirect('/');
  } else {
    const privateKey = process.env.PRIVATE_KEY;
    const { access } = req.cookies;

    // If he has then check if it's correct
    jwt.verify(access, privateKey, (err, decoded) => {
      if (err) res.redirect('/');
      // If it is then he can go on
      else next();
    });
  }
};
