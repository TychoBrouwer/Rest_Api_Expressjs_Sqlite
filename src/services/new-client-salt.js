const bcrypt = require('bcrypt');
const { application } = require('express');

const sanitizeInput = require('../utils/sanitize-input');

function set(req) {
  const { email } = sanitizeInput(req.body);

  const salt = bcrypt.genSaltSync(10);
  req.app.locals[email] = salt;

  console.log('testse', email, salt);

  return salt;
}

function get(email, req) {
  console.log(application.locals[email]);

  return req.app.locals[email];
}

module.exports = {
  set,
  get,
};
