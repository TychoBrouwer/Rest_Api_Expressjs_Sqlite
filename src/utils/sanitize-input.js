const sanitizeInput = (data) => {
  let { email, password } = data;

  email = email.trim();
  password = password.trim();

  return {
    email,
    password,
  };
};

module.exports = sanitizeInput;
