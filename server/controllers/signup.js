const bcrypt = require('bcrypt');
const { join } = require('path');

const { getUser } = require('../database/queries/getUser');
const { addUser } = require('../database/queries/addUser');

exports.renderSignup = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};

exports.postSignup = (req, res, next) => {
  // Get the email and password
  const { email, password } = req.body;

  // Check if the email already exists
  getUser(email)
    .then(result => {
      if (result.rows[0]) {
        throw new Error('User already exists');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then(hash => {
      // If it doesn't then create a new user`
      addUser(email, hash);
      res.redirect('/login');
    })
    .catch(err => {
      if (err.message.includes('already exists')) {
        // If it does then inform the user
        res.send(err.message);
      } else {
        next(err);
      }
    });
};
