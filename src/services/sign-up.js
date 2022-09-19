const sanitizeInput = require('../utils/sanitize-input');
const validateEmail = require('../utils/validate-email');

function validateCreate(data) {
  const { email, password } = data;

  let valid = true;

  valid = validateEmail(email);

  return valid;
}

function createUser(data) {
  const sanitizedInput = sanitizeInput(data);
  const valid = validateCreate(sanitizedInput);

  const { email, password } = sanitizedInput;

  return { };
}

module.exports = {
  createUser,
};
