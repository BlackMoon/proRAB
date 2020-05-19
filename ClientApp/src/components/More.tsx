import { SectionList, Text, SectionListData } from 'react-native';
import { ListItem, IconProps } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import i18n from '@localization';

import { RouteItem, RouteItemGroup } from 'models';

const sections: RouteItemGroup[] = [
	{
		data: [
			{ title: i18n.t('functions'), iconName: 'function-variant', iconType: 'material-community', route: 'repair' },
			{ title: i18n.t('tables'), iconName: 'table-settings', iconType: 'material-community', route: 'repair' },
			{ title: i18n.t('calculations'), iconName: 'functions', iconType: 'material-icons', route: 'repair' },
		],
	},
	{
		data: [
			{ title: i18n.t('settings'), route: 'settings' },
			{ title: i18n.t('about'), route: 'about' },
		],
	},
];

const keyExtractor = (item: RouteItem, index: number) => index.toString();
const renderItem = ({ item, navigation }: { item: RouteItem; navigation: NavigationProp<Record<string, object | undefined>> }) => {
	const icon: IconProps = { name: item.iconName!, type: item.iconType };
	return (
		<ListItem leftIcon={icon} title={item.title} bottomDivider={true} chevron={true} onPress={() => navigation.navigate(item.route)} />
	);
};

const renderSectionHeader = ({ section: { title } }: { section: SectionListData<RouteItem> }) => <Text>{title}</Text>;

export default function More() {
	const navigation = useNavigation();
	return (
		<SectionList<RouteItem>
			sections={sections}
			keyExtractor={keyExtractor}
			renderItem={({ item }: { item: RouteItem }) => renderItem({ item, navigation })}
			renderSectionHeader={renderSectionHeader}
		/>
	);
}