const bcrypt = require('bcrypt');

const sanitizeInput = require('../utils/sanitize-input');

function set(req) {
  const { email } = sanitizeInput(req.body);

  const salt = bcrypt.genSaltSync(10);
  app.set(email, salt);

  console.log(app.get(email));

  return salt;
}

function get(req, email) {
  console.log(app.get(email));

  return app.get(email);
}

module.exports = {
  set,
  get,
};
