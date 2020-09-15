import { flow } from 'mobx';

import { Catalog } from '@models';
import { catalogService } from '@services';
import { DataActivityStore } from './activity-store';

class CatalogStore extends DataActivityStore<Catalog> {
	selectId = (c: Catalog) => c.catalogId;
	constructor() {
		super();
		this.loadCatalogs = this.loadCatalogs.bind(this);
	}

	loadCatalogs = flow(function* (this: CatalogStore) {
		if (this.dataLoaded) {
			return;
		}

		this.loading = true;
		try {
			const catalogs = yield catalogService.getAll();
			this.setManyMutably(catalogs);
			this.dataLoaded = true;
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});
}

export default new CatalogStore();
