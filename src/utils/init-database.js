const db = require('../services/users-db');

function initDatabase() {
  const loginTable = `
    CREATE TABLE IF NOT EXISTS 
    login_table (
      'user_id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'email' varchar NOT NULL, 
      'password' varchar, 
      'client_salt' varchar, 
      'server_salt' varchar, 
      UNIQUE(email)
    );`;

  db.run(loginTable, []);
}

module.exports = initDatabase;
