import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import { executeSql } from './services';

const migrations: ReadonlyMap<number, string> = new Map<number, string>([
    [1, require('migrations/1.sql')]
]);

const migrate = async () => {
    const { rows } = await executeSql('PRAGMA user_version;');
    const { user_version } = rows.item(0);
    console.debug(user_version);

    const orderedKeys = Array
        .from(migrations.keys()).sort((a, b) => a - b)
        .filter(key => key > user_version);

    // tslint:disable:prefer-for-of
    for (let i = 0; i < orderedKeys.length; i++){
        const path = migrations.get(orderedKeys[i]);
        const uri = await Asset.fromModule(path).uri;
        console.debug(uri);
        const sql = await FileSystem.readAsStringAsync(uri);
        await executeSql(sql);
    }
}

export { migrate };