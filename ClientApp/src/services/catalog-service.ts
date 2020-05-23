import { Catalog } from '@models';
import { cast } from 'shared/cast';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class CatalogService extends DataService<Catalog> {
	constructor() {
		super('catalog');
	}

	async getAll(): Promise<Catalog[]> {
		const { rows } = await executeSql(`SELECT CatalogId, CatalogName FROM ${this.table}`);
		return cast((rows as any)._array, Catalog) as Catalog[];
	}
}
