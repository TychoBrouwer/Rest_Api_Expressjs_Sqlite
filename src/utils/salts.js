const bcrypt = require('bcrypt');

const db = require('./users-db');

function getSalt(clientSalt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;
  const saltQuery = db.query(query, email)[0];

  if (saltQuery) {
    return saltQuery[value];
  }

  return bcrypt.genSaltSync(10);
}

module.exports = {
  getSalt,
};
