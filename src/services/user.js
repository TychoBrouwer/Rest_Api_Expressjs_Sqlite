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

  console.log(`id: ${userID}`);
  console.log(`unhashed: ${toUpdate.Password}`);

  if (toUpdate.Password) {
    const serverSalt = salts.getSalt(false, userID);
    toUpdate.Password = bcrypt.hashSync(toUpdate.Password, serverSalt);
    console.log(`serversalt: ${serverSalt}`);
  }

  console.log(`hashed: ${toUpdate.Password}`);

  try {
    const valuesToUpdate = Object.keys(toUpdate);

    console.log(`value to update: ${valuesToUpdate}`);

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

module.exports = {
  updateUserDetails,
};
