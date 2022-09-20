const bcrypt = require('bcrypt');
const app = require('../main');

const sanitizeInput = require('../utils/sanitize-input');

function set(req) {
  const { email } = sanitizeInput(req.body);

  const salt = bcrypt.genSaltSync(10);

  app.locals[email] = salt;

  console.log(app.locals[email]);

  return salt;
}

function get(req, email) {
  console.log(app.locals[email]);

  return app.locals[email];
}

module.exports = {
  set,
  get,
};
