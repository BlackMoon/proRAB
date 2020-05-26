import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Constants from 'expo-constants';
import { inject, observer } from 'mobx-react';

import RootStore from '@stores/root-store';

interface AboutProps {
	rootStore: typeof RootStore;
}

const About: FC<AboutProps> = inject('rootStore')(
	observer(({ rootStore }) => (
		<View>
			<Text>{Constants.manifest.name}</Text>
			<Text>{Constants.manifest.version}</Text>
			<Text>{rootStore.dbVersion}</Text>
		</View>
	))
);

export { About };
