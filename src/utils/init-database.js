const Sqlite = require('better-sqlite3');
const { resolve } = require('path');

function initDatabase() {
  const db = new Sqlite(resolve('users.db'), { fileMustExist: true });

  const createTable = `
    CREATE TABLE IF NOT EXISTS 
    login_table (
      'user_id' int NOT NULL AUTO_INCREMENT, 
      'email' varchar NOT NULL, 
      'password' varchar, 
      'clientSalt' varchar, 
      'serverSalt' varchar, 
      PRIMARY KEY (user_id),
      UNIQUE(email)
    );`;

  db.exec(createTable);
}

module.exports = initDatabase;
