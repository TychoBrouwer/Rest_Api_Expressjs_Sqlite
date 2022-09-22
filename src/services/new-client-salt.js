const bcrypt = require('bcrypt');

const app = require('../main');

const sanitizeInput = require('../utils/sanitize-input');

function set(data) {
  const { email } = sanitizeInput(data);

  const salt = bcrypt.genSaltSync(10);
  app.locals[email] = salt;

  console.log(app.locals);
  console.log(`client salt: ${app.locals[email]}`);

  return salt;
}

function get(email) {
  console.log(`client salt: ${app.locals[email]}`);

  return app.locals[email];
}

module.exports = {
  set,
  get,
};
