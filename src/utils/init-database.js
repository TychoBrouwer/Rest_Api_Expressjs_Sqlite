const db = require('./users-db');

function initDatabase() {
  const userTable = `
    CREATE TABLE IF NOT EXISTS
    users (
      'UserID' INTEGER PRIMARY KEY AUTOINCREMENT,
      'Email' VARCHAR(320) NOT NULL UNIQUE,
      'Password' VARCHAR(60) NOT NULL,
      'ClientSalt' VARCHAR(29) NOT NULL,
      'ServerSalt' VARCHAR(29) NOT NULL,
      'AuthToken' VARCHAR(30),
      'FirstName' VARCHAR(20),
      'LastName' VARCHAR(20),
      'Inventory' TEXT NOT NULL
    );`;

  db.run(userTable, []);

  const groupTable = `
  CREATE TABLE IF NOT EXISTS
  groups (
    'GroupID' INTEGER PRIMARY KEY AUTOINCREMENT,
    'UserID' INTEGER NOT NULL,
    'Inventory' TEXT NOT NULL,
    FOREIGN KEY(UserID) REFERENCES users(UserID)
  );`;

  db.run(groupTable, []);

  const userGroupTable = `
  CREATE TABLE IF NOT EXISTS
  users_groups (
    'RelationID' INTEGER PRIMARY KEY AUTOINCREMENT,
    'UserID' INTEGER NOT NULL,
    'GroupID' INTEGER NOT NULL,
    FOREIGN KEY(UserID) REFERENCES users(UserID),
    FOREIGN KEY(GroupID) REFERENCES groups(GroupID)
  );`;

  db.run(userGroupTable, []);

  const barCodeTable = `
  CREATE TABLE IF NOT EXISTS
  barcodes (
    'Code' INTEGER PRIMARY KEY,
    'Name' VARCHAR(20) NOT NULL,
    'Quantity' INTEGER NOT NULL,
    'QuantityType' VARCHAR(20) NOT NULL
  );`;

  db.run(barCodeTable, []);

  console.log('databases initiated');
}

module.exports = initDatabase;
