import { observable, flow } from 'mobx';

import { Catalog } from './../models';
import { catalogService, recordService } from './../services'; //'@services';
import { ActivityStore } from './activity-store';

class RecordsStore extends ActivityStore {
	constructor() {
		super();
		this.loadRecords = this.loadRecords.bind(this);
	}

	@observable catalog: Catalog;
	@observable records: object[] = [];

	loadRecords = flow(function* (this: RecordsStore, catalogId: number) {
		this.loading = true;
		this.catalog = yield catalogService.get(catalogId);
		if (this.catalog) {
			this.records = yield recordService.getAll(this.catalog.tableName);
		}
		this.loading = false;
	});
}

export default new RecordsStore();
