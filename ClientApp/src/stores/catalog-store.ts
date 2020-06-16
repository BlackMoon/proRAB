import { action, flow, observable } from 'mobx';

import { catalogService } from '../services';
import { Catalog } from '../models';
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
		this.catalogs = yield catalogService.getAll();
		this.loading = false;
	});
}

export default new CatalogStore();
