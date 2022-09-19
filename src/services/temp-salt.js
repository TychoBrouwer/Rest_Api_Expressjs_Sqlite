const bcrypt = require('bcrypt');

const sanitizeInput = require('../utils/sanitize-input');

const tempSalts = {};

function set(data) {
  const { email } = sanitizeInput(data);

  const salt = bcrypt.genSaltSync(10);

  tempSalts[email] = salt;

  return salt;
}

function get(email) {
  return tempSalts[email];
}

module.exports = {
  set,
  get,
};
