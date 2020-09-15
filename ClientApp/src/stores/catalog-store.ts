import { flow, observable } from 'mobx';

import { Catalog } from '@models';
import { catalogService } from '@services';
import { DataActivityStore } from './activity-store';

class CatalogStore extends DataActivityStore {
	constructor() {
		super();
		this.loadCatalogs = this.loadCatalogs.bind(this);
	}

	@observable catalogs: Catalog[] = [];

	loadCatalogs = flow(function* (this: CatalogStore) {
		if (this.dataLoaded) {
			return;
		}

		this.loading = true;
		try {
			this.catalogs = yield catalogService.getAll();
			this.dataLoaded = true;
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});
}

export default new CatalogStore();
