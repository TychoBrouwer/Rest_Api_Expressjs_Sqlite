const sanitizeInput = (data) => {
  const returnObj = {};

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      console.log(data[key]);
      if (data[key].includes('assword')) {
        returnObj[key] = data[key].trim();
      } else {
        returnObj[key] = data[key].trim().toLowerCase();
      }
    } else {
      returnObj[key] = data[key];
    }
  });

  return returnObj;
};

module.exports = sanitizeInput;
