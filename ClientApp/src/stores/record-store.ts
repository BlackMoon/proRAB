import { observable, flow } from 'mobx';

import { Catalog } from '@models';
import { catalogService, recordService } from '@services';
import { ActivityStore } from './activity-store';

class RecordStore extends ActivityStore {
	constructor() {
		super();
		this.loadRecords = this.loadRecords.bind(this);
	}

	@observable catalog?: Catalog;
	@observable records: any[] = [];

	addRecord = (record: object): number => {
		console.log('add');
		return 1;
	};

	loadRecord = (recordId: number): object => {
		const keyProperty = `Catalog${this.catalog?.catalogCode.toAlphaCase()}Id`;
		return this.records.find(r => r[keyProperty] === recordId);
	};

	loadRecords = flow(function* (this: RecordStore, catalogId: number) {
		this.loading = true;
		this.catalog = yield catalogService.get(catalogId);
		if (this.catalog) {
			try {
				this.records = yield recordService.getAll(this.catalog.tableName);
			} catch (ex) {
				this.records = [];
				console.log(ex);
			}
		}
		this.loading = false;
	});

	updateRecord = (record: object) => {
		console.log('update');
		return 1;
	};
}

export default new RecordStore();
