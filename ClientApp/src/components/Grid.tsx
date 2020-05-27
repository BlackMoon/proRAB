import React from 'react';
import { Text, View } from 'react-native';
import { WithLoader } from '../hoc/WithLoader';

const Grid = () => (
	<View>
		<Text>HOC</Text>
	</View>
);

const Grid1 = WithLoader(Grid);

export { Grid1 as Grid };
