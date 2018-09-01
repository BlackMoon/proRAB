import { Asset, FileSystem as FS, SQLite } from "expo";
import config from "@config";

const dbName = "projects.db";
const dbLocation = `../projects.db`;

export class DataService {
  constructor() {
    if (this.constructor === DataService) {
      //throw new TypeError("Cannot construct DataService instances directly");
    }

    /*this._db.transaction(tx => {
      tx.executeSql(
        "create table if not exists functions (id integer primary key not null, done int, value text);"
      );
    });*/
  }

  async add(entity) {}

  async delete(key) {}

  async get(key) {}

  async getAll(...args) {
    //await FS.downloadAsync(
    //Asset.fromModule(require(`${config.DB_LOCATION}`)).uri,
    //`${FS.documentDirectory}SQLite/${config.DB_NAME}`
    //);
    /*
    const { exists } = await FS.getInfoAsync(
      `${FS.documentDirectory}SQLite/${dbName}`
    );
    console.log(exists);

    this._db = SQLite.openDatabase(dbName);

    return new Promise((resolve, reject) =>
      this._db.transaction(tx => {
        tx.executeSql(
          "select * from functions",
          [],
          (_, { rows }) => resolve(rows),
          (_, error) => reject(error)
        );
      })
    );*/
  }

  async update(entity) {}
}
