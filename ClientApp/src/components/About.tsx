import { Text, View } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';
import { inject, observer } from 'mobx-react';

import RootStore from '@store/root-store';

interface AboutProps {
	rootStore: typeof RootStore;
}

const About: React.FC<AboutProps> = ({ rootStore }) => (
	<View>
		<Text>{Constants.manifest.name}</Text>
		<Text>{Constants.manifest.version}</Text>
		<Text>{rootStore.dbVersion}</Text>
	</View>
);

export default inject('rootStore')(observer(About));
