import { observable, flow } from 'mobx';
import { Catalog } from '@models';
import { CatalogService } from '@services';

class CatalogsStore {
	dataService = new CatalogService();

	@observable catalog: Catalog;
	@observable catalogs: Catalog[] = [];

	loadCatalog = flow(function* (this: CatalogsStore, catalogId: number) {
		this.catalog = yield this.dataService.get(catalogId);
	});

	loadCatalogs = flow(function* (this: CatalogsStore) {
		this.catalogs = yield this.dataService.getAll();
	});
}

export default new CatalogsStore();
