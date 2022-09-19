const db = require('../services/users-db');

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

function getSalt(clientSalt, email) {
  let value = 'server_salt';

  if (clientSalt) {
    value = 'client_salt';
  }

  const query = `SELECT ${value} FROM login_table WHERE email = ?`;
  const saltQuery = db.query(query, email)[0];

  let salt;

  if (saltQuery) {
    salt = saltQuery.client_salt;
    // } else {
    //   salt = bcrypt.genSaltSync(10);

    //   setSalt('client_salt', salt, email);
  }

  return salt;
}

module.exports = {
  getSalt,
  setSalt,
};
