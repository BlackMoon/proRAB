import { observable, flow } from 'mobx';

import { Catalog } from '@models';
import { catalogService, recordService } from '@services';
import { ActivityStore } from './activity-store';

class RecordStore extends ActivityStore {
	constructor() {
		super();
		this.addRecord = this.addRecord.bind(this);
		this.loadRecords = this.loadRecords.bind(this);
		this.updateRecord = this.updateRecord.bind(this);
	}

	@observable catalog?: Catalog;
	@observable forceLoad: boolean = false;
	@observable records: any[] = [];

	addRecord = flow(function* (this: RecordStore, record: any) {
		let insertedId = 0;
		this.loading = true;
		try {
			const { keyProperty, tableName } = this.catalog!;
			insertedId = yield recordService.add(record, keyProperty, tableName);
			if (insertedId > 0) {
				this.forceLoad = !this.forceLoad;
			}
		} catch (ex) {
			this.error = ex;
			console.log(ex);
		}
		this.loading = false;
		return insertedId;
	});

	loadRecord = (recordId: number): object => {
		const keyProperty = this.catalog!.keyProperty;
		return this.records.find(r => r[keyProperty] === recordId);
	};

	loadRecords = flow(function* (this: RecordStore, catalogId: number) {
		this.loading = true;
		try {
			this.catalog = yield catalogService.get(catalogId);
			if (this.catalog) {
				this.records = yield recordService.getAll(this.catalog.tableName);
			}
		} catch (ex) {
			this.error = ex;
			this.records = [];
		}
		this.loading = false;
	});

	updateRecord = flow(function* (this: RecordStore, record: any) {
		let rowsAffected = 0;
		this.loading = true;
		try {
			const { keyProperty, tableName } = this.catalog!;
			rowsAffected = yield recordService.update(record, keyProperty, tableName);
			if (rowsAffected > 0) {
				this.forceLoad = !this.forceLoad;
			}
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
		return rowsAffected;
	});
}

export default new RecordStore();
