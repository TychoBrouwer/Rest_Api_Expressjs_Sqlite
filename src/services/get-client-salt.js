const bcrypt = require('bcrypt');

const saltGen = require('../utils/salt-gen');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  const saltQuery = saltGen.getSalt(true, email)[0];

  let salt;

  if (salt) {
    salt = saltQuery.client_salt;
  } else {
    salt = bcrypt.genSaltSync(10);

    saltGen.setSalt('client_salt', salt, email);
  }

  console.log(salt);

  return salt;
}

module.exports = {
  get,
};
