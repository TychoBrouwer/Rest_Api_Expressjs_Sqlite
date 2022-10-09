const lz = require('lz-string');

const sanitizeInput = require('../utils/sanitize-input');
const db = require('../utils/users-db');
const { checkUserGroup } = require('./groups');
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
      const checkGroup = checkUserGroup(userID, groupID);

      if (!checkGroup.result) {
        return {
          userID, groupID, result: false,
        };
      }

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
      inventory: JSON.parse(lz.decompressFromUTF16(queryResult[0].Inventory)),
      result: true,
    };
  } catch (error) {
    return { userID, groupID, result: false };
  }
}

function addToInventory(data) {
  const {
    userID, groupID, password, itemData,
  } = sanitizeInput(data);

  const currentData = getInventory({ userID, password, groupID });

  try {
    let queryResult;
    let newInventory = [];
    let query;

    if (groupID) {
      query = `
        UPDATE groups
        SET Inventory = ?
        WHERE userID = ?
      `;

      const checkGroup = checkUserGroup(userID, groupID);

      if (!checkGroup.result) {
        return {
          userID, groupID, result: false,
        };
      }
    } else {
      query = `
        UPDATE users
        SET Inventory = ?
        WHERE userID = ?
      `;
    }

    if (currentData.result && currentData.inventory) {
      newInventory = currentData.inventory;
      newInventory.push(itemData);

      queryResult = db.run(query, [lz.compressToUTF16(JSON.stringify(newInventory)), userID]);

      if (queryResult.changes === 0) {
        return {
          userID, groupID, itemData, result: false,
        };
      }
    } else {
      return {
        userID, groupID, itemData, result: false,
      };
    }

    return {
      userID,
      groupID,
      newInventory,
      result: true,
    };
  } catch (error) {
    return {
      userID, groupID, itemData, result: false,
    };
  }
}

module.exports = {
  getInventory,
  addToInventory,
};
