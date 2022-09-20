const db = require('./users-db');

function initDatabase() {
  const loginTable = `
    CREATE TABLE IF NOT EXISTS 
    login_table (
      'user_id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'email' varchar NOT NULL UNIQUE, 
      'password' VARCHAR(60), 
      'client_salt' VARCHAR(29), 
      'server_salt' VARCHAR(29)
    );`;

  db.run(loginTable, []);

  console.log('database initiated');
}

module.exports = initDatabase;
