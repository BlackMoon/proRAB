import { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { CatalogScreenRouteProp, CatalogsScreenNavigatorProp } from '@navigation';
import CatalogsStore from '@stores/catalogs-store';

interface CatalogItemProps {
	catalogsStore: typeof CatalogsStore;
	navigation: CatalogsScreenNavigatorProp;
	route: CatalogScreenRouteProp;
}

const CatalogItem: FC<CatalogItemProps> = inject('catalogsStore')(
	observer(({ catalogsStore, navigation, route }) => {
		useEffect(() => {
			(async () => catalogsStore.loadCatalogs())();
		}, []);

		const { catalogId, catalogName } = route.params;
		navigation.setOptions({ title: catalogName });

		return null;
	})
);

export { CatalogItem };
