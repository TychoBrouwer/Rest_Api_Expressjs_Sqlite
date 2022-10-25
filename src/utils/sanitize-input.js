const sanitizeInput = (data) => {
  const returnObj = {};

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      if (key.includes('password')) {
        returnObj[key] = data[key].trim();
      } else {
        returnObj[key] = data[key].trim().toLowerCase();
      }
    } else if (typeof data[key] === 'object') {
      data[key].forEach((item, index) => {
        returnObj[key][index] = item.trim().toLowerCase();
      });
    } else {
      returnObj[key] = data[key];
    }
  });

  return returnObj;
};

module.exports = sanitizeInput;
