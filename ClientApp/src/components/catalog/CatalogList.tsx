import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

import i18n, { translate } from '@localization';
import { CatalogsScreenNavigatorProp } from '@navigation';
import { WithLoader } from '../WithLoader';
import { CatalogsStore } from '../../stores/catalogs-store';
import { Catalog } from './../../models';

interface CatalogListProps {
	catalogsStore: CatalogsStore;
	navigation: CatalogsScreenNavigatorProp;
}

const keyExtractor = (item: Catalog) => item.catalogId.toString();
const renderItem = ({ item, navigation }: { item: Catalog; navigation: CatalogsScreenNavigatorProp }) => {
	const catalogName = translate(item, 'catalogName');
	return (
		<ListItem
			leftIcon={{
				name: 'folder-o',
				type: 'font-awesome',
			}}
			title={catalogName}
			subtitle={
				item.isSystem ? (
					<View>
						<Text>{i18n.t('system')}</Text>
					</View>
				) : null
			}
			bottomDivider
			onPress={() => navigation.navigate('catalog', { catalogId: item.catalogId, catalogName })}
		/>
	);
};

const CatalogListWithLoader = WithLoader(FlatList);

const CatalogList: FC<CatalogListProps> = inject('catalogsStore')(
	observer(({ catalogsStore, navigation }) => {
		const { catalogs, clearCatalogs, loadCatalogs, loading } = catalogsStore;

		useEffect(() => {
			navigation.addListener('blur', () => clearCatalogs());
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
