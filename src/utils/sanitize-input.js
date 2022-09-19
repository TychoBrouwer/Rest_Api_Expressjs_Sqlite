const sanitizeInput = (data) => {
  const returnObj = {};

  Object.keys(data).forEach((key) => {
    returnObj[key] = data[key].trim();
  });

  return returnObj;
};

module.exports = sanitizeInput;
