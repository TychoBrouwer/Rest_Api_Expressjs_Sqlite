const db = require('../services/users-db');

function getSalt(clientSalt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;
  const salt = db.prepare(query).get(email);

  return salt;
}

module.exports = getSalt;
