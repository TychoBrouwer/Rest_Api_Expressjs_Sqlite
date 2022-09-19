const bcrypt = require('bcrypt');

const db = require('./users-db');
const saltGen = require('../utils/salt-gen');

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

  if (valid) {
    const serverSalt = bcrypt.genSaltSync(10);
    const clientSalt = saltGen.getSalt(true, email)[0];

    const query = `
      INSERT login_table
      SET password = ?, server_salt = ?, client_salt = ?
      WHERE email = ?
    `;

    db.run(query, [password, serverSalt, clientSalt, email]);
  }

  return { };
}

module.exports = {
  createUser,
};
