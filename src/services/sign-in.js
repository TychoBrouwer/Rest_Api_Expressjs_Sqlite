const bcrypt = require('bcrypt');

const db = require('./users-db');
const sanitizeInput = require('../utils/sanitize-input');
const salts = require('../utils/salts');

function authUser(data) {
  const { email, password } = sanitizeInput(data);

  let result = true;
  let queryResult;

  try {
    const serverSalt = salts.getSalt(false, email);
    const passwordHash = bcrypt.hashSync(password, serverSalt);

    const query = 'SELECT * FROM login_table where email=? and password=?';
    queryResult = db.query(query, [email, passwordHash]);

    if (!queryResult[0]) {
      result = false;
    }
  } catch (error) {
    result = false;
  }

  return {
    email: queryResult[0].email,
    result,
  };
}

module.exports = {
  authUser,
};
