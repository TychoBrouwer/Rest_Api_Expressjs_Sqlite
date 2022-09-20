const { getSalt } = require('../utils/salts');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  const salt = getSalt(true, email);

  if (salt) {
    return salt;
  }

  return false;
}

module.exports = {
  get,
};
