const { getSalt, setSalt } = require('../utils/salts');

const sanitizeInput = require('../utils/sanitize-input');

function set(data) {
  const { email } = sanitizeInput(data);

  return setSalt(true, email);
}

function get(email) {
  return getSalt(true, email);
}

module.exports = {
  set,
  get,
};
