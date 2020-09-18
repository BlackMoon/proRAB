import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatGrid, FlatGridProps } from 'react-native-super-grid';
import { inject, observer } from 'mobx-react';

import { Aggregate } from '@models';
import { AggregationScreenNavigatorProp } from '@navigation';
import stores from '@stores';
import { WithLoader } from '../Hoc';

interface ConstructionListProps {
	aggregateStore: typeof stores.aggregateStore;
	navigation: AggregationScreenNavigatorProp;
}

const keyExtractor = (item: Aggregate) => item.aggregateId.toString();

const renderItem = ({ item, navigation }: { item: Aggregate; navigation: AggregationScreenNavigatorProp }) => {
	return (
		<TouchableHighlight underlayColor="white" onPress={() => navigation.navigate('aggregate', { aggregateId: item.aggregateId })}>
			<View style={styles.itemContainer}>
				<Text style={styles.itemName}>{Reflect.get(item, 'aggregateNameRu')}</Text>
				<Text style={styles.itemName}>{item.aggregateType}</Text>
			</View>
		</TouchableHighlight>
	);
};

const ConstructionListWithLoader = WithLoader<FlatGridProps<Aggregate>>(FlatGrid);

const ConstructionList: FC<ConstructionListProps> = inject('aggregateStore')(
	observer(({ aggregateStore, navigation }) => {
		const { allEntities, loadAggregates, loading } = aggregateStore;

		useEffect(() => {
			(async () => loadAggregates())();
		}, []);

		return (
			<ConstructionListWithLoader
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

export { ConstructionList };
