import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { getMigrations, getVersion, migrate } from './src/preload';

export default class App extends Component {
	state = { progress: 0, version: 0, isReady: true };

	async componentDidMount() {
		const version = await getVersion();
		this.setState({ version });

		console.debug(`current version: ${version}`);

		const migrations = getMigrations(version);
		const migrationsTotal = migrations.length;

		if (migrationsTotal > 0) {
			this.setState({ isReady: false });
			for (const [i, key] of migrations.entries()) {
				await migrate(key);
				this.setState({ progress: (i + 1) / migrationsTotal });
			}
		}

		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady) {
			return (
				<View style={styles.container}>
					<Text>{this.state.version === 0 ? 'Creating database' : 'Updating'}</Text>
					<Progress.Bar progress={this.state.progress} width={200} />
				</View>
			);
		}
		return (
			<NavigationContainer>
				<AppNavigator></AppNavigator>
			</NavigationContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
