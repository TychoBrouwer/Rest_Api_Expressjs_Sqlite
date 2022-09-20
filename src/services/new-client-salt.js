const bcrypt = require('bcrypt');

const sanitizeInput = require('../utils/sanitize-input');

function set(req) {
  const { email } = sanitizeInput(req.body);

  const salt = bcrypt.genSaltSync(10);
  req.app.locals[email] = salt;

  console.log(req.app.locals);

  return salt;
}

function get(req, email) {
  console.log(req.app.locals);

  return req.app.locals[email];
}

module.exports = {
  set,
  get,
};
