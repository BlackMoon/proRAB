import { WithTranslation } from './with-translation';
import { Field } from './field';

export class Catalog extends WithTranslation {
	constructor() {
		super('catalogName');

		this.catalogId = 0;
		this.catalogCode = '';
		this.isSystem = false;
		this.tableName = '';
	}

	catalogId: number;
	catalogCode: string;
	fields: Field[];
	isSystem: boolean;
	tableName: string;
}
