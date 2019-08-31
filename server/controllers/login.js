const { join } = require('path');

exports.renderLogin = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
};
