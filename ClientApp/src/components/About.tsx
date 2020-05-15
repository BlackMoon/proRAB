import { Text, View } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';

const About = () => (
	<View>
		<Text>{Constants.manifest.name}</Text>
		<Text>{Constants.manifest.version}</Text>
	</View>
);

export default About;
