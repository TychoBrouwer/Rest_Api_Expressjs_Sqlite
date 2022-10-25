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
    } else if (typeof data[key] === 'object') {
      console.log(data[key]);
      console.log(Object.keys(data[key]).forEach((itemKey) => {
        if (typeof data[key][itemKey] === 'string') {
          console.log(data[key][itemKey].trim().toLowerCase());
        } else {
          console.log(data[key][itemKey]);
        }
      }));
      Object.keys(data[key]).forEach((itemKey) => {
        console.log('item: ' + itemKey);
        if (typeof data[key][itemKey] === 'string') {
          returnObj[key][itemKey] = data[key][itemKey].trim().toLowerCase();
        } else {
          returnObj[key][itemKey] = data[key][itemKey];
        }
      });
    } else {
      returnObj[key] = data[key];
    }
  });

  return returnObj;
};

module.exports = sanitizeInput;
