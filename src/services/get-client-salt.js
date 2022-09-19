const bcrypt = require('bcrypt');

const saltGen = require('../utils/salt-gen');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  let salt = saltGen.getSalt(true, email);

  console.log(salt);

  // if (salt) {
  salt = bcrypt.genSaltSync(10);

  saltGen.setSalt('client_salt', salt, email);
  // }

  console.log(salt);

  return salt;
}

module.exports = {
  get,
};
