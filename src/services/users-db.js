import Sqlite from 'better-sqlite3';
import { resolve } from 'path';

const db = new Sqlite(resolve('users.db'), { fileMustExist: true });

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

export default {
  query,
  run,
};
