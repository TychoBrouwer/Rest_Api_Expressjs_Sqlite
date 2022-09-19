const db = require('../services/users-db');

function getSalt(clientSalt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;
  const salt = db.query(query, email);

  return salt;
}

function setSalt(clientSalt, salt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `
    INSERT INTO login_table
    (email = ?, ${value} = ?)`;

  db.run(query, [email, salt]);

  return salt;
}

module.exports = {
  getSalt,
  setSalt,
};
