import { SectionList, SectionListData, SectionListRenderItem } from 'react-native';
import React from 'react';

interface ListProps<ItemT> {
	items: ItemT[];
	keyExtractor: (item: ItemT, index: number) => string;
	renderItem: SectionListRenderItem<ItemT>;
	renderSectionHeader: (info: { section: SectionListData<ItemT> }) => React.ReactElement | null;
}

const List: React.FC<ListProps<ItemT>> = props => {
	const { items, keyExtractor, renderItem, renderSectionHeader } = props;
	return (
		<SectionList<ItemT> sections={items} keyExtractor={keyExtractor} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />
	);
};

export default List;
