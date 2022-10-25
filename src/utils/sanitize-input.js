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
      console.log(data[key]);
      data[key].forEach((item, index) => {
        console.log(item);
        returnObj[key][index] = item.trim().toLowerCase();
      });
    } else {
      returnObj[key] = data[key];
    }
  });

  return returnObj;
};

module.exports = sanitizeInput;
