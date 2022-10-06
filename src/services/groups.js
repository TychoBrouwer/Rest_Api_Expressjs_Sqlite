const lz = require('lz-string');

const db = require('../utils/users-db');
const sanitizeInput = require('../utils/sanitize-input');
const { authUser } = require('./sign-in');

function getGroups(userID) {
  try {
    const query = 'SELECT * FROM users_groups where UserID = ?';
    const queryResult = db.query(query, [userID]);

    if (queryResult.length === 0) {
      return { userID, result: false };
    }

    return queryResult;
  } catch (error) {
    return { userID, result: false };
  }
}

function checkUserGroup(userID, groupID) {
  try {
    const query = 'SELECT * FROM users_groups where UserID = ? AND GroupID = ?';
    const queryResult = db.query(query, [userID, groupID]);

    if (queryResult.length === 0) {
      return { userID, groupID, result: false };
    }

    return { userID, groupID, result: true };
  } catch (error) {
    return { userID, groupID, result: false };
  }
}

function groupExists(groupID) {
  try {
    const query = `
      SELECT EXISTS(SELECT 1 FROM groups WHERE GroupID = ?)
      VALUES ( ? );
    `;

    const queryResult = db.run(query, [groupID]);

    if (!queryResult[0]) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

function addToGroup(data) {
  const { userID, groupID, password } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, groupID, result: false };
  }

  try {
    const query = `
      INSERT INTO users_groups (UserID, GroupID)
      VALUES ( ?, ? );
    `;

    const queryResult = db.run(query, [userID, groupID]);

    if (queryResult.changes === 0) {
      return { userID, groupID, result: false };
    }
  } catch (error) {
    return { userID, groupID, result: false };
  }

  return { userID, groupID, result: true };
}

function createGroup(data) {
  const { userID, password } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { groupID: null, result: false };
  }

  const query = `
    INSERT INTO groups (UserID, Inventory)
    VALUES ( ?, ? );
  `;

  try {
    const queryResult = db.run(query, [userID, lz.compress('[]')]);

    if (queryResult.changes === 0) {
      return { groupID: null, result: false };
    }

    addToGroup({ userID, groupID: queryResult.lastInsertRowid, password });

    return { groupID: queryResult.lastInsertRowid, result: true };
  } catch (error) {
    console.log(error);

    return { groupID: null, result: false };
  }
}

module.exports = {
  getGroups,
  checkUserGroup,
  groupExists,
  addToGroup,
  createGroup,
};
