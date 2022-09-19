const saltGen = require('../utils/salt-gen');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  const salt = saltGen.getSalt(true, email);

  if (!salt) {
    return false;
  }

  return salt;
}

module.exports = {
  get,
};
