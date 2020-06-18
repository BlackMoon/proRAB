import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { createStackNavigator, StackNavigationProp, HeaderBackButton } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { About, CatalogItem, CatalogList, More, Settings, RecordItem } from '@components';
import i18n from '@localization';
import { Repair } from '../containers/repair';

/**
 * Repairs
 */
type RepairStackParams = {
	RepairScreen: undefined;
};

const RepairStack = createStackNavigator<RepairStackParams>();

export const RepairsStackScreen = () => (
	<RepairStack.Navigator>
		<RepairStack.Screen name="RepairScreen" component={Repair} options={{ title: i18n.t('routes.repair') }} />
	</RepairStack.Navigator>
);

/**
 * Construction
 */
type ConstructionStackParams = {
	ConstructionScreen: undefined;
};

const ConstructionStack = createStackNavigator<ConstructionStackParams>();

export const ConstructionStackScreen = () => (
	<ConstructionStack.Navigator>
		<ConstructionStack.Screen name="ConstructionScreen" component={Repair} options={{ title: i18n.t('routes.construction') }} />
	</ConstructionStack.Navigator>
);

/**
 * Objects
 */
type ObjectsStackParams = {
	ObjectsScreen: undefined;
	Card: undefined;
};

type ObjectsRootStackParams = {
	ObjectsScreen: undefined;
	Modal: undefined;
};

const ObjectsStack = createStackNavigator<ObjectsStackParams>();
const ObjectsRootStack = createStackNavigator<ObjectsRootStackParams>();

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontSize: 30 }}>This is the home screen!</Text>
			<Button onPress={() => navigation.navigate('Card')} title="Open Card" />
			<Button onPress={() => navigation.navigate('Modal')} title="Open Modal" />
		</View>
	);
}

function ModalScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontSize: 30 }}>This is a modal!</Text>
			<Button onPress={() => navigation.goBack()} title="Dismiss" />
		</View>
	);
}

export const ObjectsStackScreen = () => (
	<ObjectsStack.Navigator>
		<ObjectsStack.Screen name="ObjectsScreen" component={HomeScreen} options={{ title: i18n.t('routes.objects') }} />
		<ObjectsStack.Screen name="Card" component={Repair} options={{ title: i18n.t('routes.objects') }} />
	</ObjectsStack.Navigator>
);

export const ObjectsRootStackScreen = () => (
	<ObjectsRootStack.Navigator mode="modal">
		<ObjectsRootStack.Screen
			name="ObjectsScreen"
			component={ObjectsStackScreen}
			options={{ headerShown: false, title: i18n.t('routes.objects') }}
		/>
		<ObjectsRootStack.Screen name="Modal" component={ModalScreen} options={{ title: i18n.t('routes.objects') }} />
	</ObjectsRootStack.Navigator>
);

/**
 * Catalog
 */

type CatalogMainStackParams = {
	catalog: { catalogId: number; catalogName: string };
	catalogs: undefined;
};

const CatalogMainStack = createStackNavigator<CatalogMainStackParams>();

export type CatalogScreenRouteProp = RouteProp<CatalogMainStackParams, 'catalog'>;
export type CatalogScreenNavigatorProp = StackNavigationProp<CatalogMainStackParams>;

export const CatalogsMainScreen = () => (
	<CatalogMainStack.Navigator initialRouteName="catalogs">
		<CatalogMainStack.Screen
			name="catalog"
			component={CatalogItem}
			options={({ route, navigation }) => ({
				headerRight: ({ tintColor }) => (
					<Icon style={{ paddingEnd: 15 }} name="md-add" type="ionicon" onPress={() => navigation.navigate('record', {})} />
				),
			})}
		/>
		<CatalogMainStack.Screen name="catalogs" component={CatalogList} options={{ title: i18n.t('routes.catalogs') }} />
	</CatalogMainStack.Navigator>
);

type CatalogStackParams = {
	main: undefined;
	record: { recordId?: number };
};

const CatalogStack = createStackNavigator<CatalogStackParams>();

export type RecordScreenRouteProp = RouteProp<CatalogStackParams, 'record'>;
export type RecordScreenNavigatorProp = StackNavigationProp<CatalogStackParams, 'record'>;

// modal stackNavigator
export const CatalogScreen = () => (
	<CatalogStack.Navigator initialRouteName="main" mode="modal">
		<CatalogStack.Screen name="main" component={CatalogsMainScreen} options={{ headerShown: false, title: i18n.t('cancel') }} />
		<CatalogStack.Screen
			name="record"
			component={RecordItem}
			options={({ route, navigation }) => {
				const { recordId } = route.params;
				return {
					headerLeft: () => (
						<HeaderBackButton
							backImage={() => <View></View>}
							label={i18n.t('cancel')}
							onPress={() => navigation.goBack()}
						></HeaderBackButton>
					),
					title: i18n.t(recordId ? 'record.edit' : 'record.new'),
				};
			}}
		/>
	</CatalogStack.Navigator>
);

/**
 * More
 */
type MoreStackParams = {
	about: undefined;
	more: undefined;
	repair: undefined;
	settings: undefined;
};

const MoreStack = createStackNavigator<MoreStackParams>();

export const MoreStackScreen = () => (
	<MoreStack.Navigator>
		<MoreStack.Screen name="more" component={More} options={{ title: i18n.t('routes.more') }} />
		<MoreStack.Screen name="settings" component={Settings} options={{ title: i18n.t('routes.settings') }} />
		<MoreStack.Screen name="about" component={About} options={{ title: i18n.t('routes.about') }} />
	</MoreStack.Navigator>
);
