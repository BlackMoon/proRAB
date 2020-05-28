import { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { CatalogScreenRouteProp, CatalogsScreenNavigatorProp } from '@navigation';
import { RecordsStore } from '@stores';

interface CatalogItemProps {
	recordsStore: typeof RecordsStore;
	navigation: CatalogsScreenNavigatorProp;
	route: CatalogScreenRouteProp;
}

const CatalogItem: FC<CatalogItemProps> = inject('recordsStore')(
	observer(({ recordsStore, navigation, route }) => {
		useEffect(() => {
			(async () => recordsStore.loadCatalogs())();
		}, []);

		const { catalogId, catalogName } = route.params;
		navigation.setOptions({ title: catalogName });

		return null;
	})
);

export { CatalogItem };
