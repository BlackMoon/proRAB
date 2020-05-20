import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';
import 'mobx-react-lite/batchingForReactNative';

import { getMigrations, getVersion, migrate } from 'preload';
import AppNavigator from '@navigation/AppNavigator';
import Migration from '@components/Migration';
import RootStore from '@store/root-store';

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
			RootStore.setDbVersion(version);
			setIsReady(true);
		})();
	}, []);

	return (
		<Provider rootStore={RootStore}>
			{!isReady ? <Migration progress={progress} version={version}></Migration> : <AppNavigator></AppNavigator>}
		</Provider>
	);
}