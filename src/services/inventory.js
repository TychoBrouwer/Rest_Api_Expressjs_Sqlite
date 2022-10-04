const sanitizeInput = require('../utils/sanitize-input');
const db = require('../utils/users-db');
const { authUser } = require('./sign-in');

function getInventory(data) {
  const { userID, password, groupID } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, result: false };
  }

  try {
    let queryResult;

    if (groupID) {
      // get the groups data
      // if this fails return user inventory
    } else {
      const query = 'SELECT Inventory FROM users WHERE UserID = ?';
      queryResult = db.query(query, [userID]);

      if (!queryResult[0]) {
        return { userID, result: false };
      }
    }

    return {
      userID,
      groupID: groupID || null,
      inventory: queryResult[0].Inventory,
    };
  } catch (error) {
    return { userID, result: false };
  }
}

module.exports = {
  getInventory,
};
