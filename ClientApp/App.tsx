import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import AppNavigator from 'navigation/AppNavigator';
import { i18n, locale } from '@localization';
import { getMigrations, getVersion, migrate } from 'preload';
import Migration from '@components/Migration';

const LocalizationContext = React.createContext('en');

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
		// const [locale, setLocale] = React.useState(i18n.locale);
		// const localizationContext = React.useMemo(
		// 	() => ({
		// 		t: (scope, options) => i18n.t(scope, { locale, ...options }),
		// 		locale,
		// 		setLocale,
		// 	}),
		// 	[locale]
		// );

		if (!this.state.isReady) {
			return <Migration progress={this.state.progress} version={this.state.version}></Migration>;
		}
		return (
			<Provider>
				{/* <LocalizationContext.Provider value={localizationContext}> */}
					<AppNavigator></AppNavigator>
				{/* </LocalizationContext.Provider> */}
			</Provider>
		);
	}
}
