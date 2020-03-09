import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import config from '../constants';

const db = SQLite.openDatabase(config.DB_NAME);

const executeSql = async (sqlStatement, ...args): Promise<SQLResultSet> => {
    console.log(args);
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

const migrate = async () => {
    const { rows } = await executeSql('PRAGMA user_version;');
    const { user_version } = rows.item(0);
    console.log(user_version);

    const migrations = await FileSystem.readDirectoryAsync(config.MIGRATIONS_URI);
    console.log(migrations);
}

export { migrate };