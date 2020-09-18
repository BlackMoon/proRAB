import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatGrid, FlatGridProps } from 'react-native-super-grid';
import { inject, observer } from 'mobx-react';

import stores from '@stores';
import { Aggregate } from '@models';
import { AggregationScreenNavigatorProp } from '@navigation';
import { WithLoader } from '../Hoc';

interface RepairListProps {
	aggregateStore: typeof stores.aggregateStore;
	navigation: AggregationScreenNavigatorProp;
}

const keyExtractor = (item: Aggregate) => item.aggregateId.toString();

const renderItem = ({ item, navigation }: { item: Aggregate; navigation: AggregationScreenNavigatorProp }) => {
	return (
		<TouchableHighlight underlayColor="white" onPress={() => navigation.navigate('aggregate', { aggregateId: item.aggregateId })}>
			<View style={styles.itemContainer}>
				<Text style={styles.itemName}>{Reflect.get(item, 'aggregateNameRu')}</Text>
			</View>
		</TouchableHighlight>
	);
};

const RepairListWithLoader = WithLoader<FlatGridProps<Aggregate>>(FlatGrid);

const RepairList: FC<RepairListProps> = inject('aggregateStore')(
	observer(({ aggregateStore, navigation }) => {
		const { allEntities, loadAggregates, loading } = aggregateStore;

		useEffect(() => {
			(async () => loadAggregates())();
		}, []);

		return (
			<RepairListWithLoader
				loading={loading}
				style={styles.gridView}
				itemDimension={100}
				data={allEntities}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => renderItem({ item, navigation })}
			/>
		);
	})
);

const styles = StyleSheet.create({
	gridView: {
		flex: 1,
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 15,
		backgroundColor: 'green',
		padding: 10,
		height: 100,
	},
	itemName: {
		fontSize: 16,
		color: '#000',
		fontWeight: '600',
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#000',
	},
});

export { RepairList };
