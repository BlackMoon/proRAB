import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import { executeSql } from './services';

const migrations: ReadonlyMap<number, string> = new Map<number, string>([
    [1, require('./assets/migrations/1.sql')]
]);

const migrate = async () => {
    // await executeSql('PRAGMA user_version=0;');
    const { rows } = await executeSql('PRAGMA user_version;');
    const { user_version } = rows.item(0);
    console.debug(`user_version: ${user_version}`);

    const orderedKeys = Array
        .from(migrations.keys()).sort((a, b) => a - b)
        .filter(key => key > user_version);

    for (const key of orderedKeys){
        console.debug(`Applying migration: ${key}`);
        const uri = await Asset.fromModule(migrations.get(key)).uri;
        const path = `${FileSystem.documentDirectory}${key}.sql`;
        await FileSystem.downloadAsync(uri, path);
        const sql = await FileSystem.readAsStringAsync(path);
        await executeSql(sql);
    }
}

export { migrate };