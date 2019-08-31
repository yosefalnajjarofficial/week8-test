const { join } = require('path');

exports.renderSignup = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};
