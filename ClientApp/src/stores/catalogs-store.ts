import { action, flow, observable } from 'mobx';

import { Catalog } from '@models';
import { CatalogService } from '@services';
import { ActivityStore } from './activity-store';

class CatalogsStore extends ActivityStore {
	dataService = new CatalogService();

	constructor() {
		super();
		this.loadCatalogs = this.loadCatalogs.bind(this);
	}

	@observable catalogs: Catalog[] = [];

	@action clearCatalogs = () => (this.catalogs = []);

	loadCatalogs = flow(function* (this: CatalogsStore) {
		this.loading = true;
		this.catalogs = yield this.dataService.getAll();
		this.loading = false;
	});
}

export default new CatalogsStore();
