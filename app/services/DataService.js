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

  executeSql = async (sqlStatement, ...args) => {
    console.log(args);
    return new Promise((resolve, reject) =>
      db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          [...args],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      })
    );
  };

  async add(entity, keyField = "id") {
    const entries = Object.entries(entity).filter(([k]) => k !== keyField);
    const sqlStatement =
      `insert into ${this.table}(` +
      entries.map(([k, v]) => `${k}`).join(",") +
      `) values(` +
      Array(entries.length)
        .fill("?")
        .join(",") +
      ")";

    const { insertId } = await this.executeSql(
      sqlStatement,
      ...entries.map(([k, v]) => v)
    );
    return insertId;
  }

  async delete(entity, keyField = "id") {
    const { rowsAffected } = await this.executeSql(
      `delete from ${this.table} where ${keyField} = ?`,
      entity[keyField]
    );
    return rowsAffected;
  }

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

  async update(entity, keyField = "id") {
    const entries = Object.entries(entity).filter(([k]) => k !== keyField);

    const sqlStatement =
      `update ${this.table} set ` +
      entries
        .map(
          ([k, v]) => `${k} = ` + (typeof v === "string" ? `'${v}'` : `${v}`)
        )
        .join(",") +
      ` where ${keyField} = ?`;

    const { rowsAffected } = await this.executeSql(
      sqlStatement,
      entity[keyField]
    );
    return rowsAffected;
  }
}
