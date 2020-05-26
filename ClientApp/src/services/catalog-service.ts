import { Catalog } from '@models';
import { castArray } from '@shared';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class CatalogService extends DataService<Catalog> {
	constructor() {
		super('catalog');
	}

	async getAll(): Promise<Catalog[]> {
		 const { rows } = await executeSql(`SELECT CatalogId, CatalogCode, CatalogNameEn, CatalogNameRu FROM ${this.table}`);
		return castArray((rows as any)._array, Catalog);
	}
}
