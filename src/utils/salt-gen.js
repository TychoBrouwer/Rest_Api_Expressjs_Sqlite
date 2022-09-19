const db = require('../services/users-db');

function getSalt(clientSalt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;
  const result = db.query(query, email);

  return result;
}

function setSalt(clientSalt, salt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `
    INSERT INTO login_table (user_id, email, ${value})
    VALUES (NULL, ?, ?)`;

  const result = db.run(query, [email, salt]);

  return result;
}

module.exports = {
  getSalt,
  setSalt,
};
