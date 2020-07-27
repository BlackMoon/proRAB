import React, { FC, useEffect } from 'react';
import { FlatListProps, StyleSheet, Text, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

import { translate } from '@localization';
import { Field } from '@models';
import { CatalogScreenRouteProp, RecordScreenNavigatorProp } from '@navigation';
import { recordStore } from '@stores';
import { WithLoader, WithSearchBar } from '../Hoc';

const styles = StyleSheet.create({
	field: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	subtitle: {
		paddingLeft: 10,
		paddingTop: 5,
	},
});

interface CatalogItemProps {
	recordStore: typeof recordStore;
	navigation: RecordScreenNavigatorProp;
	route: CatalogScreenRouteProp;
}

const renderItem = ({
	item,
	keyProperty,
	nameProperty,
	fields,
	navigation,
}: {
	item: any;
	keyProperty: string;
	nameProperty: string;
	fields?: Field[];
	navigation: RecordScreenNavigatorProp;
}) => {
	const key = item[keyProperty];
	const name = translate(item, nameProperty);

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
			title={name}
			subtitle={<View style={styles.subtitle}>{subtitle}</View>}
			bottomDivider
			onPress={() => navigation.navigate('record', { recordId: key })}
		/>
	);
};

const CatalogItemWithLoader = WithLoader(WithSearchBar<FlatListProps<any>>(FlatList));

const CatalogItem: FC<CatalogItemProps> = inject('recordStore')(
	observer(({ recordStore, navigation, route }) => {
		const { catalogId, catalogName } = route.params;
		const { catalog, filteredRecords, forceReload, loading, filterRecords, loadRecords } = recordStore;

		useEffect(() => {
			(async () => loadRecords(catalogId))();
		}, [forceReload]);

		navigation.setOptions({ title: catalogName });

		const keyProperty = catalog?.keyProperty || '';
		const nameProperty = catalog?.nameProperty || '';
		const fields = catalog?.fields;

		return (
			<CatalogItemWithLoader
				data={filteredRecords}
				keyExtractor={item => item[keyProperty].toString()}
				loading={loading}
				onChangeText={filterRecords}
				onClear={filterRecords}
				renderItem={({ item }) => renderItem({ item, keyProperty, nameProperty, fields, navigation })}
			></CatalogItemWithLoader>
		);
	})
);

export { CatalogItem };
