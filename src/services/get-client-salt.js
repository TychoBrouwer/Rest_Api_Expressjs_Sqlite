const getSalt = require('../utils/getSalt');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  const salt = getSalt(true, email);

  console.log(salt);

  return salt;
}

module.exports = get;
