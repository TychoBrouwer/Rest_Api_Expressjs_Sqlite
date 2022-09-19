const db = require('../services/users-db');

function initDatabase() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS 
    login_table (
      'user_id' int NOT NULL, 
      'email' varchar NOT NULL, 
      'password' varchar, 
      'client_salt' varchar, 
      'server_salt' varchar, 
      PRIMARY KEY (user_id),
      UNIQUE(email)
    );`;

  db.run(createTable);
}

module.exports = initDatabase;
