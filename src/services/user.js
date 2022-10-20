const bcrypt = require('bcrypt');

const sanitizeInput = require('../utils/sanitize-input');
const db = require('../utils/users-db');
const { authUser } = require('./sign-in');
const salts = require('../utils/salts');

function updateUserDetails(data) {
  const {
    userID, password, toUpdate,
  } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, result: false };
  }

  if (toUpdate.Password) {
    const serverSalt = salts.getSalt(false, userID);
    toUpdate.Password = bcrypt.hashSync(toUpdate.Password, serverSalt);
  }

  try {
    const valuesToUpdate = Object.keys(toUpdate);

    let query = `
      UPDATE users
      SET `;

    const queryValues = [];

    for (let i = 0; i < valuesToUpdate.length; i += 1) {
      query += `${valuesToUpdate[i]} = ?${i !== valuesToUpdate.length - 1 ? ',' : ''} `;
      queryValues.push(toUpdate[valuesToUpdate[i]]);
    }

    query += `
      WHERE userID = ?`;
    queryValues.push(userID);

    const queryResult = db.run(
      query,
      queryValues,
    );

    if (queryResult.changes === 0) {
      return {
        userID, result: false,
      };
    }

    return {
      userID,
      result: true,
    };
  } catch (error) {
    return {
      userID, result: false,
    };
  }
}

function getIdFromEmail(email) {
  try {
    const query = 'SELECT UserID FROM users where Email = ?';

    const queryResult = db.query(query, [email]);

    if (!queryResult[0]) {
      return false;
    }

    return queryResult[0].UserID;
  } catch (error) {
    return false;
  }
}

function getEmailFromId(id) {
  try {
    const query = 'SELECT Email FROM users where UserID = ?';

    const queryResult = db.query(query, [id]);

    if (!queryResult[0]) {
      return false;
    }

    return queryResult[0].UserID;
  } catch (error) {
    return false;
  }
}

module.exports = {
  updateUserDetails,
  getIdFromEmail,
  getEmailFromId,
};
