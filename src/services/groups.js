const lz = require('lz-string');

const db = require('../utils/users-db');
const sanitizeInput = require('../utils/sanitize-input');
const { authUser } = require('./sign-in');

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

    return { data: queryResult, result: true };
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

// function groupExists(groupID) {
//   try {
//     const query = `
//       SELECT EXISTS(SELECT 1 FROM groups WHERE GroupID = ?)
//       VALUES ( ? );
//     `;

//     const queryResult = db.run(query, [groupID]);

//     if (!queryResult[0]) {
//       return false;
//     }

//     return true;
//   } catch (error) {
//     return false;
//   }
// }

function addToGroup(data) {
  const {
    userID, password, groupID, toAddId,
  } = sanitizeInput(data);

  const authResult = authUser({ userID, password });

  if (!authResult.result) {
    return { userID, groupID, result: false };
  }

  const usersGroup = getUsers({ userID, groupID });

  console.log(usersGroup);
  console.log(usersGroup.length);
  console.log(usersGroup.includes(userID));

  // if (!groupCheck.result) {
  //   return { userID, groupID, result: false };
  // }

  try {
    const query = `
      INSERT INTO users_groups (UserID, GroupID)
      VALUES ( ?, ? );
    `;

    const queryResult = db.run(query, [toAddId, groupID]);

    if (queryResult.changes === 0) {
      return {
        userID, toAddId, groupID, result: false,
      };
    }
  } catch (error) {
    return {
      userID, toAddId, groupID, result: false,
    };
  }

  return {
    userID, toAddId, groupID, result: true,
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

    console.log(queryResult);

    addToGroup({ userID, groupID: queryResult.lastInsertRowid, password });

    return { groupID: queryResult.lastInsertRowid, result: true };
  } catch (error) {
    console.log(error);

    return { groupID: null, result: false };
  }
}

module.exports = {
  getGroups,
  getUsers,
  checkUserGroup,
  // groupExists,
  addToGroup,
  createGroup,
};
