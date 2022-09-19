const bcrypt = require('bcrypt');

const db = require('./users-db');

const sanitizeInput = require('../utils/sanitize-input');
const validateEmail = require('../utils/validate-email');
const { get } = require('./new-client-salt');

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
    const clientSalt = get(email);

    const passwordHash = bcrypt.hashSync(password, serverSalt);

    const query = `
      INSERT INTO login_table
      VALUES ( NULL, ?, ?, ?, ? );
    `;

    try {
      result = db.run(query, [email, passwordHash, clientSalt, serverSalt]);
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  return { result };
}

module.exports = {
  createUser,
};
