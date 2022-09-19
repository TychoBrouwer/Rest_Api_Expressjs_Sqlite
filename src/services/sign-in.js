const bcrypt = require('bcrypt');

const db = require('./users-db');
const sanitizeInput = require('../utils/sanitize-input');
const saltGen = require('../utils/salt-gen');

function authUser(data) {
  const { email, password } = sanitizeInput(data);

  const salt = saltGen.getSalt(false, email);
  const passwordHash = bcrypt.hashSync(password, salt);

  const query = 'SELECT * FROM login_table where email=? and password=?';
  const queryResult = db.query(query, [email, passwordHash]);

  console.log(queryResult);

  if (!queryResult[0]) {
    return false;
  }

  return queryResult;
}

module.exports = {
  authUser,
};
