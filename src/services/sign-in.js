const lz = require('lz-string');
const bcrypt = require('bcrypt');

const db = require('../utils/users-db');
const sanitizeInput = require('../utils/sanitize-input');
const salts = require('../utils/salts');

function authUser(data) {
  const { email, userID, password } = sanitizeInput(data);

  let queryResult;

  console.log(email, userID, password);

  try {
    const serverSalt = salts.getSalt(false, email || userID);
    const passwordHash = bcrypt.hashSync(password, serverSalt);

    const query = 'SELECT * FROM users WHERE (Email = ? OR UserID = ?) AND Password = ?';
    queryResult = db.query(query, [email, userID, passwordHash]);
    console.log(queryResult);

    if (!queryResult[0]) {
      return { email, userID, result: false };
    }

    // console.log(`new user sign-in: ${email}, user_id: ${queryResult[0].UserID}`);
  } catch (error) {
    console.log(error);

    return { email, userID, result: false };
  }


  return {
    email: queryResult[0].Email,
    userID: queryResult[0].UserID,
    firstName: queryResult[0].FirstName,
    lastName: queryResult[0].LastName,
    inventory: JSON.parse(lz.decompressFromUTF16(queryResult[0].Inventory)),
    grocery: JSON.parse(lz.decompressFromUTF16(queryResult[0].Grocery)),
    result: true,
  };
}

module.exports = {
  authUser,
};
