// Write a query to add the user and their password to the database
const connection = require('../config/connection');

exports.addUser = (email, password) =>
  connection.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
    email,
    password
  ]);
