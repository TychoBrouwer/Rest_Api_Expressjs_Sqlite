const bcrypt = require('bcrypt');

const saltGen = require('../utils/salt-gen');
const sanitizeInput = require('../utils/sanitize-input');

function set(data) {
  const { email } = sanitizeInput(data);

  const salt = bcrypt.genSaltSync(10);

  try {
    const result = saltGen.setSalt(true, salt, email);

    console.log(result, salt);
  } catch (error) {
    return false;
  }

  return salt;
}

module.exports = {
  set,
};
