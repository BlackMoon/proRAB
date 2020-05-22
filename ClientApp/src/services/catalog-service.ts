import { Catalog } from '@models';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class CatalogService extends DataService<Catalog> {
	constructor() {
		super('catalog');
	}

	async getAll(...args: any[]): Promise<Catalog[]> {
		//const { rows } = await executeSql(`SELECT catalogId, catalogName FROM ${this.table}`, args);
		const { rows } = await executeSql(`SELECT * FROM ${this.table}`, args);
		return (rows as any)._array;
	}
}
