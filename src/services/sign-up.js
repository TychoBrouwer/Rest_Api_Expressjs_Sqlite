const bcrypt = require('bcrypt');
const lz = require('lz-string');

const db = require('../utils/users-db');
const app = require('../main');

const sanitizeInput = require('../utils/sanitize-input');
const validateEmail = require('../utils/validate-email');
const cLientSalt = require('./client-salt');

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
    const clientSalt = cLientSalt.getTemp(email);

    if (!clientSalt) {
      return { email, result: false };
    }

    const passwordHash = bcrypt.hashSync(password, serverSalt);

    const query = `
      INSERT INTO users (Email, Password, ClientSalt, ServerSalt, Inventory)
      VALUES ( ?, ?, ?, ?, ? );
    `;

    delete app.locals[email];

    try {
      const queryResult = db.run(query, [
        email, passwordHash, clientSalt, serverSalt, lz.compressToUTF16('[]'),
      ]);

      if (queryResult.changes === 0) {
        return { email, result: false };
      }

      console.log(`new user sign-up: ${email}, user_id: ${queryResult.lastInsertRowid}`);
    } catch (error) {
      console.log(error);

      return { email, result: false };
    }
  }

  return {
    email,
    result: true,
  };
}

module.exports = {
  createUser,
};
