import { Catalog, Field } from '@models';
import { castArray, castObject } from '@shared';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class CatalogService extends DataService<Catalog> {
	constructor() {
		super('catalog');
	}

	async get(catalogId: number): Promise<Catalog> {
		const { rows } = await executeSql(
			`SELECT c.CatalogId, c.CatalogCode, c.TableName, f.fieldId, f.FieldCode, f.FieldNameEn, f.FieldNameRu 
			FROM ${this.table} c
			LEFT JOIN Field f ON f.CatalogId = c.CatalogId
			WHERE c.CatalogId=?`,
			catalogId
		);

		let catalog: any = null;
		if (rows.length > 0) {
			catalog = castObject(rows.item(0), Catalog);
			catalog.fields = castArray((rows as any)._array, Field).filter(f => f.fieldId);
		}
		return catalog;
	}

	async getAll(): Promise<Catalog[]> {
		const { rows } = await executeSql(
			`SELECT CatalogId, CatalogCode, CatalogNameEn, CatalogNameRu, IsSystem, TableName FROM ${this.table} ORDER BY IsSystem`
		);
		return castArray((rows as any)._array, Catalog);
	}
}
