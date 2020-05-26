import { Catalog } from '@models';
import { castArray } from '@shared';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class CatalogService extends DataService<Catalog> {
	constructor() {
		super('catalog');
	}

	get(key: any) {
		throw new Error('Method not implemented.');
	}

	async getAll(): Promise<Catalog[]> {
		const { rows } = await executeSql(
			`SELECT CatalogId, CatalogCode, CatalogNameEn, CatalogNameRu, System FROM ${this.table} ORDER BY System`
		);
		return castArray((rows as any)._array, Catalog);
	}
}
