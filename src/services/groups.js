const lz = require('lz-string');

const db = require('../utils/users-db');
const sanitizeInput = require('../utils/sanitize-input');
const { authUser } = require('./sign-in');
const { getIdFromEmail, getEmailFromId } = require('./user');

function getGroupOwner(groupID) {
  try {
    const query = 'SELECT UserID FROM groups where GroupID = ?';
    const queryResult = db.query(query, [groupID]);

    return queryResult[0].UserID;
  } catch (error) {
    return false;
  }
}

function getGroups(data) {
  const { userID, password } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, result: false };
  }

  try {
    const query = 'SELECT * FROM users_groups where UserID = ?';
    const queryResult = db.query(query, [userID]);

    return { data: queryResult, result: true };
  } catch (error) {
    return { userID, result: false };
  }
}

function getUsers(data) {
  const { userID, password, groupID } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, result: false };
  }

  try {
    const query = 'SELECT * FROM users_groups where GroupID = ?';
    const queryResult = db.query(query, [groupID]);

    for (let i = 0; i < queryResult.length; i += 1) {
      queryResult[i].Email = getEmailFromId(queryResult[i].UserID);
    }

    return { data: queryResult, groupOwner: getGroupOwner(groupID), result: true };
  } catch (error) {
    return { userID, result: false };
  }
}

function checkUserGroup(data) {
  const { userID, groupID } = sanitizeInput(data);

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

function checkUserIsOwner(userID, groupID) {
  try {
    const query = 'SELECT * FROM groups where UserID = ? AND GroupID = ?';
    const queryResult = db.query(query, [userID, groupID]);

    if (queryResult.length === 0) {
      return { userID, groupID, result: false };
    }

    return { userID, groupID, result: true };
  } catch (error) {
    return { userID, groupID, result: false };
  }
}

function addToGroup(data) {
  const {
    userID, password, groupID, emailToAdd,
  } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, groupID, result: false };
  }

  const usersGroupResult = getUsers({ userID, password, groupID });

  if (!usersGroupResult.result) {
    return { userID, groupID, result: false };
  }

  const usersGroup = usersGroupResult.data.map((groupData) => groupData.UserID);

  if (usersGroup.length !== 0 && !usersGroup.includes(userID)) {
    return { userID, groupID, result: false };
  }

  const idToAdd = getIdFromEmail(emailToAdd);

  if (usersGroup.includes(idToAdd)) {
    return {
      userID, groupID, result: true, already: true,
    };
  }

  if (!idToAdd) {
    return {
      userID, emailToAdd, groupID, result: false,
    };
  }

  try {
    const query = `
      INSERT INTO users_groups (UserID, GroupID)
      VALUES ( ?, ? );
    `;

    const queryResult = db.run(query, [idToAdd, groupID]);

    if (queryResult.changes === 0) {
      return {
        userID, emailToAdd, groupID, result: false,
      };
    }
  } catch (error) {
    return {
      userID, emailToAdd, groupID, result: false,
    };
  }

  return {
    userID, emailToAdd, groupID, result: true,
  };
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
    const queryResult = db.run(query, [userID, lz.compressToUTF16('[]')]);

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

function removeFromGroup(data) {
  const {
    userID, password, groupID, idToRemove,
  } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return {
      userID, groupID, idToRemove, result: false,
    };
  }

  const checkUser = checkUserIsOwner(userID, groupID);

  if (!checkUser.result) {
    return {
      userID, groupID, idToRemove, result: false,
    };
  }

  if (userID === idToRemove) {
    return {
      userID, groupID, idToRemove, result: false,
    };
  }

  try {
    const query = 'DELETE FROM users_groups WHERE GroupID = ? AND UserID = ?';

    const queryResult = db.run(query, [groupID, idToRemove]);

    if (queryResult.changes === 0) {
      return {
        userID, groupID, idToRemove, result: false,
      };
    }

    return {
      userID, groupID, idToRemove, result: true,
    };
  } catch (error) {
    console.log(error);

    return {
      userID, groupID, idToRemove, result: false,
    };
  }
}

module.exports = {
  getGroups,
  getUsers,
  checkUserGroup,
  removeFromGroup,
  addToGroup,
  createGroup,
};
