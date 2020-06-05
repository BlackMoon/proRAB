import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

import { CatalogScreenRouteProp, CatalogsScreenNavigatorProp } from '@navigation';
import { recordsStore } from '@stores';
import './../../shared/string.extensions';
import i18n, { translate } from '@localization';
import { WithLoader } from '../WithLoader';

interface CatalogItemProps {
	recordsStore: typeof recordsStore;
	navigation: CatalogsScreenNavigatorProp;
	route: CatalogScreenRouteProp;
}

const renderItem = ({
	item,
	keyProperty,
	nameProperty,
	navigation,
}: {
	item: unknown;
	keyProperty: string;
	nameProperty: string;
	navigation: CatalogsScreenNavigatorProp;
}) => {
	const key = item[keyProperty];
	const title = translate(item, nameProperty);
	return <ListItem title={title} bottomDivider onPress={() => navigation.navigate('record', { recordId: key })} />;
};

const CatalogItemWithLoader = WithLoader(FlatList);

const CatalogItem: FC<CatalogItemProps> = inject('recordsStore')(
	observer(({ recordsStore, navigation, route }) => {
		const { catalogId, catalogName } = route.params;
		const { catalog, loading, records, loadRecords } = recordsStore;

		useEffect(() => {
			(async () => loadRecords(catalogId))();
		}, []);

		navigation.setOptions({ title: catalogName });

		const keyProperty = `Catalog${catalog?.catalogCode.toAlphaCase()}Id`;
		const nameProperty = `Catalog${catalog?.catalogCode.toAlphaCase()}Name`;

		return (
			<View>
				<ListItem
					leftIcon={{
						name: 'add-circle-outline',
						type: 'MaterialIcons',
					}}
					title={i18n.t('add')}
					bottomDivider
				/>
				<CatalogItemWithLoader
					loading={loading}
					data={records}
					keyExtractor={item => item[keyProperty].toString()}
					renderItem={({ item }) => renderItem({ item, keyProperty, nameProperty, navigation })}
				></CatalogItemWithLoader>
			</View>
		);
	})
);

export { CatalogItem };
