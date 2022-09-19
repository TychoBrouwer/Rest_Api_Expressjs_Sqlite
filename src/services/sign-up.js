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

  let result = true;

  if (valid) {
    const serverSalt = bcrypt.genSaltSync(10);
    const clientSalt = get(email);

    const passwordHash = bcrypt.hashSync(password, serverSalt);

    const query = `
      INSERT INTO login_table
      VALUES ( NULL, ?, ?, ?, ? );
    `;

    try {
      const queryResult = db.run(query, [email, passwordHash, clientSalt, serverSalt]);

      if (queryResult.changes === 0) {
        result = false;
      }

      console.log(`new user sign-up: ${email}`);
    } catch (error) {
      result = false;
    }
  }

  return {
    email,
    result,
  };
}

module.exports = {
  createUser,
};
