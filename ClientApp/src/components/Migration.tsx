import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import React from 'react';

import { i18n } from '@localization';

interface MigrationProps {
	progress: number;
	version: number;
}

const Migration: React.FC<MigrationProps> = ({ progress, version }) => (
	<View style={styles.container}>
		<Text>{version === 0 ? i18n.t('creating_db') : i18n.t('updating')}</Text>
		<Progress.Bar progress={progress} width={200} />
	</View>
);

Migration.defaultProps = {
	progress: 0,
	version: 0,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Migration;
