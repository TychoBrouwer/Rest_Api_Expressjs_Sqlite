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
      const query = 'SELECT Inventory FROM groups WHERE GroupID = ?';
      queryResult = db.query(query, [groupID]);

      if (!queryResult[0]) {
        return { userID, groupID, result: false };
      }
    } else {
      const query = 'SELECT Inventory FROM users WHERE UserID = ?';
      queryResult = db.query(query, [userID]);

      if (!queryResult[0]) {
        return { userID, groupID, result: false };
      }
    }

    return {
      userID,
      groupID,
      inventory: queryResult[0].Inventory,
    };
  } catch (error) {
    return { userID, groupID, result: false };
  }
}

module.exports = {
  getInventory,
};
