import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';
import 'mobx-react-lite/batchingForReactNative';

import AppNavigator from '@navigation/AppNavigator';
import Migration from '@components/Migration';
import stores from '@stores';
import { getMigrations, getVersion, migrate } from 'preload';

/// <reference path="global.d.ts" />
//...
import './src/shared/string.extension';

export default function App() {
	const [isReady, setIsReady] = React.useState(true);
	const [progress, setProgress] = React.useState(0);
	const [version, setVersion] = React.useState(0);

	useEffect(() => {
		(async () => {
			let version = await getVersion();
			setVersion(version);

			const migrations = getMigrations(version);
			const migrationsTotal = migrations.length;
			if (migrationsTotal > 0) {
				setIsReady(false);
				for (const [i, key] of migrations.entries()) {
					await migrate(key);
					setProgress((i + 1) / migrationsTotal);
					version = key;
				}
			}
			stores.rootStore.setDbVersion(version);
			setIsReady(true);
		})();
	}, []);

	return (
		<Provider {...stores}>
			{!isReady ? <Migration progress={progress} version={version}></Migration> : <AppNavigator></AppNavigator>}
		</Provider>
	);
}
