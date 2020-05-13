import { FlatList } from 'react-native-gesture-handler';
import React from 'react';

const List = ({ items, renderItem, ...props }) => (
	<FlatList data={items} keyExtractor={item => item.id.toString()} renderItem={renderItem} {...props} />
);


export default List;
