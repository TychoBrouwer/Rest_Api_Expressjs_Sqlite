const bcrypt = require('bcrypt');

const db = require('../utils/users-db');

const sanitizeInput = require('../utils/sanitize-input');
const validateEmail = require('../utils/validate-email');
const newCLientSalt = require('./new-client-salt');

function validateCreate(data) {
  const { email } = data;

  let valid = true;

  valid = validateEmail(email);

  return valid;
}

function createUser(req) {
  const sanitizedInput = sanitizeInput(req.body);
  const valid = validateCreate(sanitizedInput);

  const { email, password } = sanitizedInput;

  let result = true;

  if (valid) {
    const serverSalt = bcrypt.genSaltSync(10);
    console.log('testtse');
    const clientSalt = newCLientSalt.get(req, email);

    if (!clientSalt) {
      result = false;
    } else {
      const passwordHash = bcrypt.hashSync(password, serverSalt);

      const query = `
        INSERT INTO login_table (email, password, client_salt, server_salt)
        VALUES ( ?, ?, ?, ? );
      `;

      try {
        const queryResult = db.run(query, [email, passwordHash, clientSalt, serverSalt]);

        if (queryResult.changes === 0) {
          result = false;
        } else {
          console.log(`new user sign-up: ${email}, user_id: ${queryResult.lastInsertRowid}`);
        }
      } catch (error) {
        console.log(error);

        result = false;
      }
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
