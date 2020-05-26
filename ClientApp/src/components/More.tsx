import React, { FC } from 'react';
import { SectionList, Text, SectionListData } from 'react-native';
import { ListItem, IconProps } from 'react-native-elements';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import i18n from '@localization';
import { RouteItem, RouteItemGroup } from '@models';

interface MoreProps {	
	navigation: NavigationProp<ParamListBase>;
}

const sections: RouteItemGroup[] = [
	{
		data: [
			{ title: i18n.t('routes.functions'), iconName: 'function-variant', iconType: 'material-community', route: 'repair' },
			{ title: i18n.t('routes.tables'), iconName: 'table-settings', iconType: 'material-community', route: 'repair' },
			{ title: i18n.t('routes.calculations'), iconName: 'functions', iconType: 'material-icons', route: 'repair' },
		],
	},
	{
		data: [
			{ title: i18n.t('routes.settings'), route: 'settings' },
			{ title: i18n.t('routes.about'), route: 'about' },
		],
	},
];

const keyExtractor = (item: RouteItem, index: number) => index.toString();
const renderItem = ({ item, navigation }: { item: RouteItem; navigation: NavigationProp<Record<string, object | undefined>> }) => {
	const icon: IconProps = { name: item.iconName!, type: item.iconType };
	return <ListItem leftIcon={icon} title={item.title} bottomDivider chevron onPress={() => navigation.navigate(item.route)} />;
};

const renderSectionHeader = ({ section: { title } }: { section: SectionListData<RouteItem> }) => <Text>{title}</Text>;

const More: FC<MoreProps> = ({ navigation }) => {
	return (
		<SectionList<RouteItem>
			sections={sections}
			keyExtractor={keyExtractor}
			renderItem={({ item }) => renderItem({ item, navigation })}
			renderSectionHeader={renderSectionHeader}
		/>
	);
}

export { More };
