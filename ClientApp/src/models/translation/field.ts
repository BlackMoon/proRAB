import { WithTranslation } from './with-translation';

export class Field extends WithTranslation {
	constructor() {
		super('fieldName');

		this.fieldId = 0;
		this.fieldCode = '';
	}

	fieldId: number;
	fieldCode: string;
}
