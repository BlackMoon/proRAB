import { Asset, FileSystem as FS, SQLite } from "expo";

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

  add(entity) {}

  delete(key) {}

  get(key) {}

  async getAll(...args) {
    await FS.downloadAsync(
      Asset.fromModule(require(dbLocation)).uri,
      `${FS.documentDirectory}SQLite/${dbName}`
    );

    const { exists } = await FS.getInfoAsync(
      `${FS.documentDirectory}SQLite/${dbName}`
    );
    console.log(exists);

    this._db = SQLite.openDatabase(dbName);

    this._db.transaction(tx => {
      tx.executeSql(
        "select * from functions",
        [],
        (_, { rows }) => {
          console.log(rows);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }

  update(entity) {}
}
