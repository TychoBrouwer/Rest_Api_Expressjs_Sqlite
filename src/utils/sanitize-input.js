const sanitizeInput = (data) => {
  let { email, password } = data;

  email = email.trim().escape();
  password = password.trim().escape();

  return {
    email,
    password,
  };
};

export default sanitizeInput;
