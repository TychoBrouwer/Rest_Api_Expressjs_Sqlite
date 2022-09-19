const bcrypt = require('bcrypt');

const { default: validateEmail } = require('../utils/validate-email');
const { default: sanitizeInput } = require('../utils/sanitize-input');
const db = require('./users-db');

// function sanitizeInput(data) {
//   let { email, password } = data;

//   email = email.trim().escape();
//   password = password.trim().escape();

//   return {
//     email,
//     password,
//   };
// }

function authUser(data) {
  const { email, password } = sanitizeInput(data);

  let result = {};

  if (!validateEmail(email)) {
    result = {
      valid: false,
      apiToken: false,
      message: 'No valid email was entered.',
    };
  }

  console.log(email, password);

  // const data = db.query('SELECT * FROM quote LIMIT ?,?', []);

  return { result };
}

function validateCreate(userObj) {
  const messages = [];

  console.log(userObj);

  if (!userObj) {
    messages.push('No object is provided');
  }

  if (!userObj.email) {
    messages.push('Email is empty');
  }

  if (messages.length) {
    const error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function createUser(userObj) {
  validateCreate(userObj);
  const { quote, author } = userObj;
  const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', { quote, author });

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }

  return { message };
}

module.exports = {
  authUser,
  createUser,
};
