import { Catalog } from './../models';
import { castArray, castObject } from './../shared';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class CatalogService extends DataService<Catalog> {
	constructor() {
		super('catalog');
	}

	async get(catalogId: number): Promise<Catalog> {
		const { rows } = await executeSql(`SELECT CatalogId, CatalogCode, TableName FROM ${this.table} WHERE CatalogId=?`, catalogId);
		return castObject(rows.item(0), Catalog);
	}

	async getAll(): Promise<Catalog[]> {
		const { rows } = await executeSql(
			`SELECT CatalogId, CatalogCode, CatalogNameEn, CatalogNameRu, IsSystem, TableName FROM ${this.table} ORDER BY IsSystem`
		);
		return castArray((rows as any)._array, Catalog);
	}
}
