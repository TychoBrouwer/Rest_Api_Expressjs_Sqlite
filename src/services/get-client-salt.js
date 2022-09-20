const { getSalt } = require('../utils/salts');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  const salt = getSalt(true, email);

  if (salt) {
    return salt;
  }

  console.log(email, salt);

  return false;
}

module.exports = {
  get,
};
