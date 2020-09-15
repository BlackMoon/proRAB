import { observable, flow } from 'mobx';

import i18n, { translate } from '@localization';
import { Catalog } from '@models';
import { catalogService, recordService } from '@services';
import { DataActivityStore } from './activity-store';

class RecordStore extends DataActivityStore<any> {
	selectId = (r: any) => r[this.catalog!.keyProperty];
	sortComparer = (a: any, b: any) => {
		const nameProperty = this.catalog!.nameProperty;
		const aname = translate(a, nameProperty);
		const bname = translate(b, nameProperty);
		return aname.localeCompare(bname);
	}

	constructor() {
		super();
		this.addRecord = this.addRecord.bind(this);
		this.loadRecords = this.loadRecords.bind(this);
		this.updateRecord = this.updateRecord.bind(this);
	}

	catalog?: Catalog;
	searchText?: string;

	@observable currentRecord: any = {};
	@observable filteredRecords: any[] = [];

	addRecord = flow(function* (this: RecordStore, record: any) {
		let insertedId = 0;
		this.loading = true;
		try {
			const { keyProperty, tableName } = this.catalog!;
			insertedId = yield recordService.add(record, keyProperty, tableName);
			if (insertedId > 0) {
				record[keyProperty] = insertedId;
				this.addOneMutably(record);
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

	loadRecord = (recordId?: number) => {
		this.currentRecord = recordId ? this.entities[recordId] : {};
	};

	loadRecords = flow(function* (this: RecordStore, catalogId: number) {
		this.loading = true;
		this.filteredRecords = [];
		this.searchText = undefined;
		try {
			this.catalog = yield catalogService.get(catalogId);
			if (this.catalog) {
				const records = yield recordService.getAll(this.catalog.tableName);
				this.setManyMutably(records);
				this.filteredRecords = this.allEntities;
			}
		} catch (ex) {
			this.error = ex;
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
				this.updateOneMutably(record);
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
			const normalizedText = this.searchText.trim().toLowerCase();
			this.filteredRecords = this.allEntities.filter(r => r[field]?.toLowerCase().includes(normalizedText));
		} else {
			this.filteredRecords = this.allEntities;
		}
	}
}

export default new RecordStore();
