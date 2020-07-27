import React, { useState, FC } from 'react';
import { Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';

import i18n from '@localization';

export interface SearchInputProps {
	onChangeText?(text: string): void;
}

const SearchInput: FC<SearchInputProps> = ({ onChangeText }) => {
	const [search, setSearch] = useState('');

	let platform: 'android' | 'ios' | undefined;
	switch (Platform.OS) {
		case 'android':
		case 'ios':
			platform = Platform.OS;
			break;
	}

	return (
		<SearchBar
			cancelButtonTitle={i18n.t('cancel')}
			placeholder={i18n.t('search')}
			platform={platform}
			showCancel={false}
			onChangeText={text => {
				setSearch(text);
				if (onChangeText) {
					onChangeText(text);
				}
			}}
			value={search}
		/>
	);
};

export { SearchInput };
