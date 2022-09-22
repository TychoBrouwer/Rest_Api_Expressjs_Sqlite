const sanitizeInput = (data) => {
  const returnObj = {};

  Object.keys(data).forEach((key) => {
    returnObj[key] = data[key].trim().toLowerCase();
  });

  return returnObj;
};

module.exports = sanitizeInput;
