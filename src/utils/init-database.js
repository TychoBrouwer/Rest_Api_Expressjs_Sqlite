const db = require('../services/users-db');

function initDatabase() {
  const loginTable = `
    CREATE TABLE IF NOT EXISTS 
    login_table (
      'user_id' int, 
      'email' varchar NOT NULL, 
      'password' varchar, 
      'client_salt' varchar, 
      'server_salt' varchar, 
      PRIMARY KEY (user_id), 
      UNIQUE(email)
    );`;

  db.run(loginTable, []);
}

module.exports = initDatabase;
