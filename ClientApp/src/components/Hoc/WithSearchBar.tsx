import React, { ComponentType, useState } from 'react';
import { Platform, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import i18n from '@localization';

export interface WithSearchBarProps {
	onChangeText?(text: string): void;
	onClear?(): void;
}

const WithSearchBar = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P & WithSearchBarProps> => ({
	onChangeText,
	onClear,
	...props
}) => {
	const [search, setSearch] = useState('');

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
				onChangeText={text => {
					setSearch(text);
					if (onChangeText) {
						onChangeText(text);
					}
				}}
				onClear={onClear}
				value={search}
			/>
			<WrappedComponent {...(props as P)}></WrappedComponent>
		</View>
	);
};

export { WithSearchBar };
