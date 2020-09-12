import { action, flow, observable } from 'mobx';

import { Catalog } from '@models';
import { catalogService } from '@services';
import { ActivityStore } from './activity-store';

class CatalogStore extends ActivityStore {
	constructor() {
		super();
		this.loadCatalogs = this.loadCatalogs.bind(this);
	}

	@observable catalogs: Catalog[] = [];

	@action clearCatalogs = () => {
		this.catalogs = [];
	};

	loadCatalogs = flow(function* (this: CatalogStore) {
		this.loading = true;
		try {
			this.catalogs = yield catalogService.getAll();
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});
}

export default new CatalogStore();
