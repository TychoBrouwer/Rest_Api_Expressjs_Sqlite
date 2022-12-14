const db = require('../utils/users-db');
const sanitizeInput = require('../utils/sanitize-input');

function addBarCode(data) {
  const {
    code, name, quantity, quantityType,
  } = sanitizeInput(data);

  try {
    const query = `
      INSERT INTO barcodes (Code, Name, Quantity, QuantityType)
      VALUES ( ?, ?, ?, ? );
    `;

    const queryResult = db.run(query, [code, name, quantity, quantityType]);

    if (queryResult.changes === 0) {
      return {
        code, result: false,
      };
    }
  } catch (error) {
    console.log(error);

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

    if (queryResult[0]) {
      return { code, data: queryResult[0], result: true };
    }

    return { code, result: false };
  } catch (err) {
    console.log(err);

    return { code, result: false };
  }
}

module.exports = {
  getBarCode,
  addBarCode,
};
