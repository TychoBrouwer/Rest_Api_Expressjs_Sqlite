const db = require('../services/users-db');

function getSalt(clientSalt, email) {
  console.log(`email:::: ${email}`);

  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;

  console.log(query, email);

  const saltQuery = db.query(query, email)[0];

  let salt;

  if (saltQuery) {
    salt = saltQuery[value];
  }

  return salt;
}

module.exports = {
  getSalt,
};
