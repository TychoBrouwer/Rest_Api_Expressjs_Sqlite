const bcrypt = require('bcrypt');

const db = require('./users-db');

const sanitizeInput = require('../utils/sanitize-input');
const validateEmail = require('../utils/validate-email');

function validateCreate(data) {
  const { email } = data;

  let valid = true;

  valid = validateEmail(email);

  return valid;
}

function createUser(data) {
  const sanitizedInput = sanitizeInput(data);
  const valid = validateCreate(sanitizedInput);

  const { email, password } = sanitizedInput;

  let result = false;

  if (valid) {
    const serverSalt = bcrypt.genSaltSync(10);

    const query = `
      UPDATE login_table
      SET password = ?, server_salt = ?
      WHERE email = ?
    `;

    try {
      result = db.run(query, [password, serverSalt, email]);
    } catch (error) {
      return false;
    }
  }

  return { result };
}

module.exports = {
  createUser,
};
