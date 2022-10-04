const bcrypt = require('bcrypt');

const app = require('../main');
const { getSalt } = require('../utils/salts');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  const salt = getSalt(true, email);

  return salt;
}

function setTemp(data) {
  const { email } = sanitizeInput(data);

  const salt = bcrypt.genSaltSync(10);
  app.locals[email] = salt;

  return salt;
}

function getTemp(email) {
  return app.locals[email];
}

module.exports = {
  setTemp,
  getTemp,
  get,
};
