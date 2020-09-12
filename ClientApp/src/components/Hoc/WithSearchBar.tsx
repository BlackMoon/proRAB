import React, { ComponentType } from 'react';
import { Platform, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import i18n from '@localization';

export interface WithSearchBarProps {
	searchText?: string;
	onChangeText?(text: string): void;
	onClear?(): void;
}

/**
 * Looks like SearchBar in FlatList's ListHeaderComponent does not behave as usual.
 * Therefore hoc is used
 */
const WithSearchBar = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P & WithSearchBarProps> => ({
	searchText: searchValue,
	onChangeText,
	onClear,
	...props
}) => {
	let platform: 'android' | 'ios' | undefined;
	switch (Platform.OS) {
		case 'android':
		case 'ios':
			platform = Platform.OS;
			break;
	}

	return (
		<View>
			<SearchBar
				cancelButtonTitle={i18n.t('cancel')}
				placeholder={i18n.t('search')}
				platform={platform}
				showCancel={false}
				onChangeText={text => onChangeText && onChangeText(text)}
				onClear={onClear}
				value={searchValue}
			/>
			<WrappedComponent {...(props as P)}></WrappedComponent>
		</View>
	);
};

export { WithSearchBar };
