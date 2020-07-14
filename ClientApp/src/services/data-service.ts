import { executeSql } from './execute-sql';

export abstract class DataService<T> {
	protected table?: string;

	constructor(table?: string) {
		this.table = table;
	}

	async add(entity: T, keyField?: string, tableName?: string): Promise<number> {
		const keys = Object.keys(entity).filter(k => k !== keyField);
		const sqlStatement =
			`INSERT INTO ${tableName || this.table}(` +
			keys.map(k => `${k}`).join(',') +
			`) VALUES (` +
			Array(keys.length).fill('?').join(',') +
			')';

		const { insertId } = await executeSql(sqlStatement, ...keys.map(k => (entity as any)[k]));
		return insertId;
	}

	async delete(entity: T, keyField: string): Promise<number> {
		const { rowsAffected } = await executeSql(`DELETE FROM ${this.table} WHERE ${keyField} = ?`, (entity as any)[keyField]);
		return rowsAffected;
	}

	async get(key: string | number, keyField: string): Promise<T> {
		const { rows } = await executeSql(`SELECT * FROM ${this.table} WHERE ${keyField}=?`, key);
		return rows.item(0);
	}

	async getAll(...args: any[]): Promise<T[]> {
		const { rows } = await executeSql(`SELECT * FROM ${this.table}`, args);
		return (rows as any)._array;
	}

	async update(entity: T, keyField: string, tableName?: string): Promise<number> {
		const keys = Object.keys(entity).filter(k => k !== keyField);

		const sqlStatement =
			`UPDATE ${tableName || this.table} SET ` +
			keys
				.map(k => {
					const v = (entity as any)[k];
					return `${k} = ` + (typeof v === 'string' ? `'${v}'` : `${v}`);
				})
				.join(',') +
			` WHERE ${keyField} = ?`;

		const { rowsAffected } = await executeSql(sqlStatement, (entity as any)[keyField]);
		return rowsAffected;
	}
}
