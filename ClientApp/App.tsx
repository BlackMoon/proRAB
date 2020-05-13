import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import React, { Component } from 'react';

import AppNavigator from '@navigation/AppNavigator';
import i18n from '@localization';
import { getMigrations, getVersion, migrate } from 'preload';

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
					<Text>{this.state.version === 0 ? i18n.t('creating_db') : i18n.t('updating')}</Text>
					<Progress.Bar progress={this.state.progress} width={200} />
				</View>
			);
		}
		return <AppNavigator></AppNavigator>;
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
