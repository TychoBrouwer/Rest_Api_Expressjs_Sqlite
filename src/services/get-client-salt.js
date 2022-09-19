const { getSalt } = require('../utils/salts');
const sanitizeInput = require('../utils/sanitize-input');

function get(data) {
  const { email } = sanitizeInput(data);

  return getSalt(true, email);
}

module.exports = {
  get,
};
