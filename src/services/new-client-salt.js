const bcrypt = require('bcrypt');

const sanitizeInput = require('../utils/sanitize-input');

function set(req) {
  const { email } = sanitizeInput(req.body);

  const salt = bcrypt.genSaltSync(10);
  req[email] = salt;

  console.log(req[email]);

  return salt;
}

function get(req, email) {
  console.log(req[email]);

  return req[email];
}

module.exports = {
  set,
  get,
};
