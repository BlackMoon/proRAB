import { executeSql } from './execute-sql';

export abstract class DataService<T> {
	table: string;

	constructor(table: string) {
		this.table = table;
	}

	// async add(entity, keyField): Promise<number> {
	// 	const entries = Object.entries(entity).filter(([k]) => k !== keyField);
	// 	const sqlStatement =
	// 		`insert into ${this.table}(` +
	// 		entries.map(([k, v]) => `${k}`).join(',') +
	// 		`) values(` +
	// 		Array(entries.length).fill('?').join(',') +
	// 		')';

	// 	const { insertId } = await executeSql(sqlStatement, ...entries.map(([k, v]) => v));
	// 	return insertId;
	// }

	// async delete(entity, keyField = 'id'): Promise<number> {
	// 	const { rowsAffected } = await executeSql(`delete from ${this.table} where ${keyField} = ?`, entity[keyField]);
	// 	return rowsAffected;
	// }

	abstract async get(key: any);

	async getAll(...args: any[]): Promise<T[]> {
		const { rows } = await executeSql(`select * from ${this.table}`, args);
		return (rows as any)._array;
	}

	// async update(entity, keyField = 'id'): Promise<number> {
	// 	const entries = Object.entries(entity).filter(([k]) => k !== keyField);

	// 	const sqlStatement =
	// 		`update ${this.table} set ` +
	// 		entries.map(([k, v]) => `${k} = ` + (typeof v === 'string' ? `'${v}'` : `${v}`)).join(',') +
	// 		` where ${keyField} = ?`;

	// 	const { rowsAffected } = await executeSql(sqlStatement, entity[keyField]);
	// 	return rowsAffected;
	// }
}
