const db = require('../services/users-db');

function getSalt(clientSalt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;
  const salt = db.query(query, email);

  console.log(`from database: ${salt}`);

  return salt;
}

function setSalt(clientSalt, salt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `
    INSERT INTO login_table (user_id, email, client_salt)
    VALUES (NULL, ?, ?)`;

  const result = db.run(query, [email, salt]);

  console.log(`database result: ${result}`);

  return result;
}

module.exports = {
  getSalt,
  setSalt,
};
