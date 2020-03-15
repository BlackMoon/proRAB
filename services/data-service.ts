import * as SQLite from 'expo-sqlite';
import config from '../constants';

const db = SQLite.openDatabase(config.DB_NAME);

export const executeSql = async (sqlStatement, ...args): Promise<SQLResultSet> => {
    console.debug(sqlStatement, args);
    return new Promise((resolve, reject) =>
        db.transaction(tx => {
            tx.executeSql(
                sqlStatement,
                [...args],
                (_, result) => resolve(result),
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        })
    );
};

export abstract class DataService {
    table: string;

    constructor(table: string) {
      this.table = table;
    }

    async add(entity, keyField = 'id'): Promise<number> {
        const entries = Object.entries(entity).filter(([k]) => k !== keyField);
        const sqlStatement =
          `insert into ${this.table}(` +
          entries.map(([k, v]) => `${k}`).join(",") +
          `) values(` +
          Array(entries.length)
            .fill("?")
            .join(",") +
          ")";

        const { insertId } = await executeSql(
          sqlStatement,
          ...entries.map(([k, v]) => v)
        );
        return insertId;
      }

      async delete(entity, keyField = 'id'): Promise<number> {
        const { rowsAffected } = await executeSql(
          `delete from ${this.table} where ${keyField} = ?`,
          entity[keyField]
        );
        return rowsAffected;
      }

      async get(key) {
        const { rows } = await executeSql(
          `select * from ${this.table} where id=?`,
          key
        );
        return rows.item(0);
      }

      async getAll(...args) {
        const { rows } = await executeSql(`select * from ${this.table}`, args);
        return rows;
      }

      async update(entity, keyField = 'id'): Promise<number> {
        const entries = Object.entries(entity).filter(([k]) => k !== keyField);

        const sqlStatement =
          `update ${this.table} set ` +
          entries
            .map(
              ([k, v]) => `${k} = ` + (typeof v === "string" ? `'${v}'` : `${v}`)
            )
            .join(",") +
          ` where ${keyField} = ?`;

        const { rowsAffected } = await executeSql(
          sqlStatement,
          entity[keyField]
        );
        return rowsAffected;
      }

}