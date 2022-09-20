const bcrypt = require('bcrypt');

const app = require('../main');

const sanitizeInput = require('../utils/sanitize-input');

function set(data) {
  const { email } = sanitizeInput(data);

  const salt = bcrypt.genSaltSync(10);
  app.locals[email] = salt;

  return salt;
}

function get(email) {
  return app.locals[email];
}

module.exports = {
  set,
  get,
};
