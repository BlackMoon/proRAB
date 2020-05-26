import { WithTranslation } from './with-translation';

export class Catalog extends WithTranslation {
	constructor() {
		super('catalogName');

		this.catalogId = 0;
		this.catalogCode = '';
		this.system = false;
	}

	catalogId: number;
	catalogCode: string;
	system: boolean;
}
