import { observable, flow } from 'mobx';
import { Catalog } from '@models';
import { CatalogService } from '@services';

class CatalogsStore {
	dataService = new CatalogService();

	@observable catalogs: Catalog[] = [];

	loadCatalogs = flow(function* (this: CatalogsStore) {
		this.catalogs = yield this.dataService.getAll();
	});
}

export default new CatalogsStore();