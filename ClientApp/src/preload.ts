import { Asset } from 'expo-asset';
import * as FS from 'expo-file-system';

import { executeSql } from './services';

const migrations: ReadonlyMap<number, string> = new Map<number, string>([
	[1, require('./assets/migrations/1.sql')],
	// [2, require('./assets/migrations/1.sql')],
]);

export const getVersion = async (): Promise<number> => {
	// await executeSql('PRAGMA user_version=0;');
	const { rows } = await executeSql('PRAGMA user_version;');
	const { user_version } = rows.item(0);
	return user_version;
};

export const getMigrations = (currentVersion: number): number[] => {
	return Array.from(migrations.keys())
		.filter(key => key > currentVersion)
		.sort((a, b) => a - b);
};

export const migrate = async (key: number) => {
	console.debug(`Applying migration: ${key}`);
	const module = migrations.get(key);
	if (module) {
		const path = `${FS.documentDirectory}${key}.sql`;
		const uri = Asset.fromModule(module).uri;
		await FS.downloadAsync(uri, path);
		const sql = await FS.readAsStringAsync(path);
		await executeSql(sql);
	}
};
