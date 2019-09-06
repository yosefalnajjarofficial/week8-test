const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { join } = require('path');

const { getUser } = require('../database/queries/getUser');
const { addUser } = require('../database/queries/addUser');

exports.renderLogin = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
};

exports.postLogin = (req, res, next) => {
  // Get the email and password
  const { email, password } = req.body;

  // Check if the user actually exists
  getUser(email)
    .then(result => {
      if (!result.rows[0]) {
        // If user does not exist then inform the user
        throw new Error('This user does not exist');
      } else {
        const hashedPassword = result.rows[0].password;
        // If it does then compare passwords
        return bcrypt.compare(password, hashedPassword);
      }
    })
    .then(value => {
      if (!value) {
        // If password is wrong then inform the user
        throw new Error('Wrong password');
      } else {
        const privateKey = process.env.PRIVATE_KEY;
        // Give the user a cookie
        return jwt.sign({ role: 'user' }, privateKey);
      }
    })
    .then(token => {
      res.cookie('access', token);
      res.redirect('/cities');
    })
    .catch(err => {
      if (err.message.includes('does not exist')) {
        res.send(err.message);
      } else if (err.message.includes('Wrong password')) {
        res.send(err.message);
      } else {
        next(err);
      }
    });
};
