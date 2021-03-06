import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { observe } from 'mobx';
import { Provider } from 'mobx-react';

import { AppNavigator } from '@navigation';
import { Migration, Snackbar } from '@components';
import stores, { rootStore } from '@stores';
import { getMigrations, getVersion, migrate } from 'preload';

observe(rootStore, 'error', change => Snackbar.show({ message: change.newValue!.message }));

export default function App() {
	const [isReady, setIsReady] = useState(false);
	const [runMigration, setRunMigration] = useState(false);
	const [progress, setProgress] = useState(0);
	const [version, setVersion] = useState(0);

	useEffect(() => {
		(async () => {
			let version = await getVersion();
			setVersion(version);

			const migrations = getMigrations(version);
			const migrationsTotal = migrations.length;
			if (migrationsTotal > 0) {
				setRunMigration(true);
				for (const [i, key] of migrations.entries()) {
					await migrate(key);
					setProgress((i + 1) / migrationsTotal);
					version = key;
				}
			}
			rootStore.setDbVersion(version);
			setRunMigration(false);
			setIsReady(true);
		})();
	}, []);

	return runMigration ? (
		<Migration progress={progress} version={version}></Migration>
	) : !isReady ? (
		<AppLoading></AppLoading>
	) : (
		<Provider {...stores}>
			<AppNavigator></AppNavigator>
			<Snackbar />
		</Provider>
	);
}
