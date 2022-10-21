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

      console.log(checkGroup);

      if (!checkGroup.result) {
        return {
          userID, groupID, result: false,
        };
      }

      const query = 'SELECT Inventory FROM groups WHERE GroupID = ?';
      queryResult = db.query(query, [groupID]);

      console.log(queryResult);

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

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, result: false };
  }

  try {
    let queryResult;
    let newInventory = [];
    let query;

    if (groupID) {
      const checkGroup = checkUserGroup(userID, groupID);

      if (!checkGroup.result) {
        return {
          userID, groupID, result: false,
        };
      }

      query = `
        UPDATE groups
        SET Inventory = ?
        WHERE groupID = ?
      `;
    } else {
      query = `
        UPDATE users
        SET Inventory = ?
        WHERE userID = ?
      `;
    }

    if (currentData.result && currentData.inventory) {
      newInventory = currentData.inventory;

      const existingIDs = newInventory.map((a) => a.itemID).sort();

      const lowestAvailableID = existingIDs.map((number, index) => {
        if (existingIDs[index + 1] !== existingIDs[index] + 1) {
          return existingIDs[index] + 1;
        }

        return undefined;
      }).filter((number) => number !== undefined)[0];

      itemData.itemID = lowestAvailableID === undefined ? 1 : lowestAvailableID;
      newInventory.push(itemData);

      queryResult = db.run(
        query,
        [
          lz.compressToUTF16(JSON.stringify(newInventory)),
          groupID || userID,
        ],
      );

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

function removeFromInventory(data) {
  const {
    userID, groupID, password, itemID,
  } = sanitizeInput(data);

  const currentData = getInventory({ userID, password, groupID });

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, result: false };
  }

  try {
    let queryResult;
    let newInventory = [];
    let query;

    if (groupID) {
      const checkGroup = checkUserGroup(userID, groupID);

      if (!checkGroup.result) {
        return {
          userID, groupID, result: false,
        };
      }

      query = `
        UPDATE groups
        SET Inventory = ?
        WHERE groupID = ?
      `;
    } else {
      query = `
        UPDATE users
        SET Inventory = ?
        WHERE userID = ?
      `;
    }

    if (currentData.result && currentData.inventory) {
      const currentInventory = currentData.inventory;
      newInventory = currentInventory.filter((item) => item.itemID !== itemID);

      queryResult = db.run(
        query,
        [
          lz.compressToUTF16(JSON.stringify(newInventory)),
          groupID || userID,
        ],
      );

      if (queryResult.changes === 0) {
        return {
          userID, groupID, itemID, result: false,
        };
      }
    } else {
      return {
        userID, groupID, itemID, result: false,
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
      userID, groupID, itemID, result: false,
    };
  }
}

module.exports = {
  getInventory,
  addToInventory,
  removeFromInventory,
};
