const sanitizeInput = (data) => {
  const returnObj = {};

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      if (key.includes('password')) {
        returnObj[key] = data[key].trim();
      } else {
        returnObj[key] = data[key].trim().toLowerCase();
      }
    } else if (data[key] instanceof Array) {
      returnObj[key] = [];
      data[key].forEach((item) => {
        if (typeof item === 'string') {
          returnObj[key].push(item.trim().toLowerCase());
        } else {
          returnObj[key].push(item);
        }
      });
    } else {
      returnObj[key] = data[key];
    }
  });

  return returnObj;
};

module.exports = sanitizeInput;
