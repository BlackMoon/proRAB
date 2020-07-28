import { observable, flow } from 'mobx';

import { Catalog } from '@models';
import i18n from '@localization';
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
	@observable filteredRecords: any[] = [];
	@observable records: any[] = [];
	@observable searchText?: string;

	addRecord = flow(function* (this: RecordStore, record: any) {
		let insertedId = 0;
		this.loading = true;
		try {
			const { keyProperty, tableName } = this.catalog!;
			insertedId = yield recordService.add(record, keyProperty, tableName);
			if (insertedId > 0) {
				record[keyProperty] = insertedId;
				this.records.push(record);
				this.filterInternal();
			}
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
		return insertedId;
	});

	filterRecords = (text?: string) => {
		this.searchText = text;
		this.filterInternal();
	};

	loadRecord = (recordId: number): object => {
		const keyProperty = this.catalog!.keyProperty;
		return this.records.find(r => r[keyProperty] === recordId);
	};

	loadRecords = flow(function* (this: RecordStore, catalogId: number) {
		this.loading = true;
		this.searchText = undefined;
		try {
			this.catalog = yield catalogService.get(catalogId);
			if (this.catalog) {
				this.records = yield recordService.getAll(this.catalog.tableName);
				this.filteredRecords = this.records;
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
				const ix = this.records.findIndex(r => r[keyProperty] === record[keyProperty]);
				this.records[ix] = record;
				this.filterInternal();
			}
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
		return rowsAffected;
	});

	private filterInternal(locale: string = i18n.locale) {
		if (this.searchText) {
			const field = this.catalog!.nameProperty + locale.split('-').shift()?.toAlphaCase();
			const normalizedText = this.searchText?.trim().toLowerCase();
			this.filteredRecords = this.records.filter(r => r[field].includes(normalizedText));
		} else {
			this.filteredRecords = this.records;
		}
	}
}

export default new RecordStore();
