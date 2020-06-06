import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

import { CatalogScreenRouteProp, CatalogsScreenNavigatorProp } from '@navigation';
import { recordsStore } from '@stores';
import './../../shared/string.extensions';
import i18n, { translate } from '@localization';
import { WithLoader } from '../WithLoader';
import { Field } from '../../models';

const styles = StyleSheet.create({
	field: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	subtitle: {
		paddingLeft: 10,
		paddingTop: 5,
	},
});

interface CatalogItemProps {
	recordsStore: typeof recordsStore;
	navigation: CatalogsScreenNavigatorProp;
	route: CatalogScreenRouteProp;
}

const renderItem = ({
	item,
	keyProperty,
	nameProperty,
	fields,
	navigation,
}: {
	item: unknown;
	keyProperty: string;
	nameProperty: string;
	fields: Field[];
	navigation: CatalogsScreenNavigatorProp;
}) => {
	const key = item[keyProperty];
	const title = translate(item, nameProperty);

	const subtitle = fields
		? fields.map(f => (
				<View key={f.fieldCode} style={styles.field}>
					<Text>{translate(f, 'fieldName')}:</Text>
					<Text>{item[f.fieldCode.toAlphaCase()]}</Text>
				</View>
		  ))
		: null;

	return (
		<ListItem
			title={title}
			subtitle={<View style={styles.subtitle}>{subtitle}</View>}
			bottomDivider
			onPress={() => navigation.navigate('record', { recordId: key })}
		/>
	);
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
		const fields = catalog?.fields;

		return (
			<CatalogItemWithLoader
				loading={loading}
				data={records}
				keyExtractor={item => item[keyProperty].toString()}
				renderItem={({ item }) => renderItem({ item, keyProperty, nameProperty, fields, navigation })}
			></CatalogItemWithLoader>
		);
	})
);


export { CatalogItem };