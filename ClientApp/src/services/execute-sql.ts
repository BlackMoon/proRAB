import * as SQLite from 'expo-sqlite';
import config from './../config';

const db = SQLite.openDatabase(config.DB_NAME);

export const executeSql = async (sqlStatement: string, ...args: any[]): Promise<SQLResultSet> => {
	console.debug(sqlStatement);
	args?.length && console.log(args);
	return new Promise((resolve, reject) =>
		db.transaction(tx => {
			tx.executeSql(
				sqlStatement,
				args,
				(_, result) => resolve(result),
				(_, error) => {
					reject(error);
					return false;
				}
			);
		})
	);
};
