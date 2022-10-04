const speakeasy = require('speakeasy');

const app = require('../main');
const db = require('./users-db');

function getToken(userID) {
  const query = 'SELECT AuthToken FROM users where userID=?';
  const queryResult = db.query(query, [userID]);

  return queryResult[0].AuthToken;
}

function createToken(userID) {
  const token = speakeasy.totp({
    secret: app.locals.apiSecret.base32,
    digits: 10,
    encoding: 'base32',
  });

  const query = `
    UPDATE users
    SET AuthToken = ?
    WHERE userID = ?
  `;

  try {
    db.run(query, [token, userID]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getToken,
  createToken,
};
