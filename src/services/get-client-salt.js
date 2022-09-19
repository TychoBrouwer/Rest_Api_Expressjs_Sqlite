const bcrypt = require('bcrypt');
const { getSalt } = require('../utils/salt-gen');

const sanitizeInput = require('../utils/sanitize-input');

const tempSalts = {};

function set(data) {
  const { email } = sanitizeInput(data);

  let salt = getSalt(true, email);

  if (salt) {
    return salt;
  }

  salt = bcrypt.genSaltSync(10);
  tempSalts[email] = salt;

  return salt;
}

function get(email) {
  const salt = getSalt(true, email);

  console.log(salt);

  if (salt) {
    return salt;
  }

  return tempSalts[email];
}

module.exports = {
  set,
  get,
};
