const Sqlite = require('better-sqlite3');
const { resolve } = require('path');

const db = new Sqlite(resolve('users.db'), { fileMustExist: true });

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

function get(sql, params) {
  return db.prepare(sql).get(params);
}

function exec(sql) {
  return db.exec(sql);
}

module.exports = {
  query,
  run,
  get,
  exec,
};
