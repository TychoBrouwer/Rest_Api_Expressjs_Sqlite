const bcrypt = require('bcrypt');

const saltGen = require('../utils/salt-gen');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  const salt = bcrypt.genSaltSync(10);
  const result = saltGen.setSalt(true, salt, email);

  console.log(result, salt);

  return salt;
}

module.exports = {
  get,
};
