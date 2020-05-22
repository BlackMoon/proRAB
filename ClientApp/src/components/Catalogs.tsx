import React, { FC, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

import { Catalog } from 'models';
import CatalogsStore from '@stores/catalogs-store';

interface CatalogProps {
	catalogsStore: typeof CatalogsStore;
}

const keyExtractor = (item: Catalog) => item.catalogId.toString();
const renderItem = ({ item }: { item: Catalog }) => (
	<ListItem
		leftIcon={{
			name: 'folder',
			type: 'FontAwesome',
		}}
		title={item.catalogName}
		bottomDivider
	/>
);

const Catalogs: FC<CatalogProps> = ({ catalogsStore }) => {
	useEffect(() => {
		(async () => catalogsStore.loadCatalogs())();
	}, []);
	return <FlatList keyExtractor={keyExtractor} data={catalogsStore.catalogs} renderItem={renderItem} />;
};

export default inject('catalogsStore')(observer(Catalogs));
