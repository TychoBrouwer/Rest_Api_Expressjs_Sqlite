const bcrypt = require('bcrypt');

const sanitizeInput = require('../utils/sanitize-input');

function set(req) {
  const { email } = sanitizeInput(req.body);

  const salt = bcrypt.genSaltSync(10);
  req.app.set(email, salt);

  console.log(req.app.get(email));

  return salt;
}

function get(req, email) {
  console.log(req.app.get(email));

  return req.app.get(email);
}

module.exports = {
  set,
  get,
};
