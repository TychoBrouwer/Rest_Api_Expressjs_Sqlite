const bcrypt = require('bcrypt');

const db = require('./users-db');
const sanitizeInput = require('../utils/sanitize-input');
const getSalt = require('../utils/salt');

function authUser(data) {
  const { email, password } = sanitizeInput(data);

  const salt = getSalt(false, email);
  const passwordHash = bcrypt.hashSync(password, salt);

  const query = 'SELECT * FROM login_table where username=? and password=?';
  const queryResult = db.query(query, [email, passwordHash]);

  console.log(queryResult);

  return { queryResult };
}

module.exports = {
  authUser,
};
