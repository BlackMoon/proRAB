import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';

import i18n, { translate } from '@localization';
import { Catalog } from '@models';
import CatalogsStore from '@stores/catalogs-store';

interface CatalogProps {
	catalogsStore: typeof CatalogsStore;
}

const keyExtractor = (item: Catalog) => item.catalogId.toString();
const renderItem = ({ item, navigation }: { item: Catalog; navigation: NavigationProp<Record<string, object | undefined>> }) => (
	<ListItem
		leftIcon={{
			name: 'folder-o',
			type: 'font-awesome',
		}}
		title={translate(item, 'catalogName')}
		subtitle={
			item.system && (
				<View>
					<Text>{i18n.t('system')}</Text>
				</View>
			)
		}
		bottomDivider
		// dummy route
		onPress={() => navigation.navigate('repair')}
	/>
);

const Catalogs: FC<CatalogProps> = ({ catalogsStore }) => {
	const navigation = useNavigation();
	useEffect(() => {
		(async () => catalogsStore.loadCatalogs())();
	}, []);
	return <FlatList keyExtractor={keyExtractor} data={catalogsStore.catalogs} renderItem={({ item }) => renderItem({ item, navigation })} />;
};

export default inject('catalogsStore')(observer(Catalogs));
