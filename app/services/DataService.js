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

  async add(entity) {}

  async delete(key) {}

  async get(key) {}

  async getAll(...args) {
    let sqlStatement = `select * from ${this.table}`;
    return new Promise((resolve, reject) =>
      db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          [],
          (_, { rows: { _array } }) => resolve(_array),
          (_, error) => reject(error)
        );
      })
    );
  }

  async update(entity, key) {}
}
