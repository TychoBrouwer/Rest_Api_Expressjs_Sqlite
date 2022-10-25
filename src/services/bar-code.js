const db = require('../utils/users-db');
const sanitizeInput = require('../utils/sanitize-input');

function addBarCode(data) {
  const {
    code, name, quantity, quantityType,
  } = sanitizeInput(data);

  try {
    const query = `
      INSERT INTO barcodes (Name, Quantity, QuantityType)
      VALUES ( ?, ?, ? );
    `;

    const queryResult = db.run(query, [name, quantity, quantityType]);

    if (queryResult.changes === 0) {
      return {
        code, result: false,
      };
    }
  } catch (error) {
    return {
      code, result: false,
    };
  }

  return {
    code, result: true,
  };
}

function getBarCode(data) {
  const { code } = sanitizeInput(data);

  try {
    const query = 'SELECT * FROM barcodes where Code = ?';
    const queryResult = db.query(query, [code]);

    console.log(queryResult);

    return { code, data: queryResult, result: true };
  } catch (err) {
    return { code, result: true };
  }
}

module.exports = {
  getBarCode,
  addBarCode,
};
