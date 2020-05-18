import { Text, SectionList, SectionListData, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { i18n } from '@localization';

import { LocaleItemGroup, LocaleItem } from 'models';
import { ListItem } from 'react-native-elements';

const handleLocaleChange = (locale: string) => {
	Alert.alert(i18n.t('change_language'), undefined, [
		{
			text: i18n.t('cancel'),
			style: 'cancel',
		},
		{
			text: i18n.t('ok'),
			onPress: () => (i18n.locale = locale),
		},
	]);
};

const sections: LocaleItemGroup[] = [
	{
		title: i18n.t('language'),
		data: [
			{ title: i18n.t('en'), locale: 'en' },
			{ title: i18n.t('ru'), locale: 'ru' },
		],
	},
];

const keyExtractor = (item: LocaleItem, index: number) => item.locale;
const renderItem = ({ item }: { item: LocaleItem }) => (
	<ListItem
		checkmark={i18n.currentLocale() === item.locale}
		title={item.title}
		bottomDivider={true}
		onPress={() => i18n.currentLocale() !== item.locale && handleLocaleChange(item.locale)}
	/>
);
const renderSectionHeader = ({ section: { title } }: { section: SectionListData<LocaleItem> }) => (
	<Text style={styles.header}>{title}</Text>
);

const Settings = () => (
	<SectionList<LocaleItem>
		sections={sections}
		keyExtractor={keyExtractor}
		renderItem={renderItem}
		renderSectionHeader={renderSectionHeader}
	/>
);

const styles = StyleSheet.create({
	header: {
		fontSize: 16,
		padding: 6,
		paddingLeft: 14,
	},
});

export default Settings;
