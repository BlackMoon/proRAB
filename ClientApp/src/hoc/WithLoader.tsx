import React, { ComponentType } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

export interface WithLoaderProps {
	loading: boolean;
	size?: 'small' | 'large';
}

const WithLoader = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P & WithLoaderProps> => ({
	loading,
	size = 'large',
	...props
}) =>
	loading ? (
		<ActivityIndicator style={styles.activityIndicator} size={size}></ActivityIndicator>
	) : (
		<WrappedComponent {...(props as P)}></WrappedComponent>
	);

const styles = StyleSheet.create({
	activityIndicator: {
		flex: 1,
	},
});

export { WithLoader };
