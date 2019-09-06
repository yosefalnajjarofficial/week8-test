// Write a query to get the user and their password from the database
const connection = require('../config/connection');

exports.getUser = email =>
  connection.query('SELECT password FROM users WHERE email = $1', [email]);
