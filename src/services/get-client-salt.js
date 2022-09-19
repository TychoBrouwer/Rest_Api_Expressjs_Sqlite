const bcrypt = require('bcrypt');

const saltGen = require('../utils/salt-gen');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  let salt = saltGen.getSalt(true, email);

  console.log(salt[0]);

  if (salt[0]) {
    salt = bcrypt.genSaltSync(10);

    saltGen.setSalt('client_salt', salt, email);
  }

  console.log(salt);

  return salt;
}

module.exports = {
  get,
};
