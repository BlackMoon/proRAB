import { SQLite } from "expo";
import config from "@constants";

export const db = SQLite.openDatabase(config.DB_NAME);

export default class DataService {
  constructor(table) {
    if (this.constructor === DataService) {
      throw new TypeError("Cannot construct DataService instances directly");
    }
    this.table = table;
  }

  executeSql = async (sqlStatement, ...args) =>
    new Promise((resolve, reject) =>
      db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          [...args],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      })
    );

  async add(entity) {}

  async delete(key) {}

  async get(key) {
    const { rows } = await this.executeSql(
      `select * from ${this.table} where id=?`,
      key
    );
    return rows.item(0);
  }

  async getAll(...args) {
    const { rows } = await this.executeSql(`select * from ${this.table}`, args);
    return rows._array;
  }

  async update(entity, key) {
    const { rows } = await this.executeSql(
      `select * from ${this.table} where id=?`,
      key
    );
  }
}
