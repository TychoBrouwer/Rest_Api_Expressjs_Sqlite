const { getSalt } = require('../utils/salts');

function get(email) {
  return getSalt(true, email);
}

module.exports = {
  get,
};
