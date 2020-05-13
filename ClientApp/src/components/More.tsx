import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function OptionButton({ icon, label, onPress, isLastOption }) {
	return (
		<RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.optionIconContainer}>
					<Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
				</View>
				<View style={styles.optionTextContainer}>
					<Text style={styles.optionText}>{label}</Text>
				</View>
			</View>
		</RectButton>
	);
}

export default function More() {
	return (
		<ScrollView style={styles.container}>
			<OptionButton icon="md-school" label="Read the Expo documentation" />
			<OptionButton icon="md-compass" label="Read the React Navigation documentation" />
			<OptionButton icon="ios-chatboxes" label="Ask a question on the forums" isLastOption />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
	optionIconContainer: {
		marginRight: 12,
	},
	option: {
		backgroundColor: '#fdfdfd',
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: 0,
		borderColor: '#ededed',
	},
	lastOption: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	optionText: {
		fontSize: 15,
		alignSelf: 'flex-start',
		marginTop: 1,
	},
});
