import React, { FC, useEffect } from 'react';
import { FlatListProps } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

import i18n, { translate } from '@localization';
import { Catalog } from '@models';
import { CatalogScreenNavigatorProp } from '@navigation';
import { catalogStore } from '@stores';
import { WithLoader } from '../Hoc';

interface CatalogListProps {
	catalogStore: typeof catalogStore;
	navigation: CatalogScreenNavigatorProp;
}

const keyExtractor = (item: Catalog) => item.catalogId.toString();
const renderItem = ({ item, navigation }: { item: Catalog; navigation: CatalogScreenNavigatorProp }) => {
	const catalogName = translate(item, 'catalogName');
	return (
		<ListItem bottomDivider onPress={() => navigation.navigate('catalog', { catalogId: item.catalogId, catalogName })}>
			<Icon name="folder-o" type="font-awesome" />
			<ListItem.Content>
				<ListItem.Title>{catalogName}</ListItem.Title>
				<ListItem.Subtitle>{item.isSystem ? i18n.t('system') : null}</ListItem.Subtitle>
			</ListItem.Content>
			<ListItem.Chevron />
		</ListItem>
	);
};

const CatalogListWithLoader = WithLoader<FlatListProps<Catalog>>(FlatList);

const CatalogList: FC<CatalogListProps> = inject('catalogStore')(
	observer(({ catalogStore, navigation }) => {
		const { catalogs, loadCatalogs, loading } = catalogStore;

		useEffect(() => {
			navigation.addListener('focus', () => loadCatalogs());
		}, []);

		return (
			<CatalogListWithLoader
				loading={loading}
				data={catalogs}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => renderItem({ item, navigation })}
			></CatalogListWithLoader>
		);
	})
);

export { CatalogList };
