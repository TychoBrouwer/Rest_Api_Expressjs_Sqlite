const bcrypt = require('bcrypt');

const db = require('./users-db');

function getSalt(clientSalt, identifier) {
  let value = 'ServerSalt';

  if (clientSalt) {
    value = 'ClientSalt';
  }

  const query = `SELECT ${value} FROM users WHERE Email = ? OR UserID = ?`;

  const saltQuery = db.query(query, [identifier, identifier])[0];

  if (saltQuery) {
    return saltQuery[value];
  }

  return bcrypt.genSaltSync(10);
}

module.exports = {
  getSalt,
};
