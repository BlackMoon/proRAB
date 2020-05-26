import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

import i18n, { translate } from '@localization';
import { Catalog } from '@models';
import { CatalogsScreenNavigatorProp } from '@navigation';
import { catalogsStore } from '@stores';

interface CatalogListProps {
	catalogsStore: typeof catalogsStore;
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
				item.system ? (
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

const CatalogList: FC<CatalogListProps> = inject('catalogsStore')(
	observer(({ catalogsStore, navigation }) => {
		useEffect(() => {
			navigation.addListener('focus', () => catalogsStore.loadCatalogs());
			navigation.addListener('blur', () => catalogsStore.clearCatalogs());
		}, []);

		return catalogsStore.loading ? (
			<View>
				<Text>loading</Text>
			</View>
		) : (
			<FlatList keyExtractor={keyExtractor} data={catalogsStore.catalogs} renderItem={({ item }) => renderItem({ item, navigation })} />
		);
	})
);

export { CatalogList };
