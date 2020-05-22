import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import i18n from '@localization';

import About from '@components/About';
import Catalogs from '@components/Catalogs';
import More from '@components/More';
import Settings from '@components/Settings';

import { Repair } from '@containers/Repair';

/**
 * Repairs
 */
type RepairStackParams = {
	RepairScreen: undefined;
};

const RepairStack = createStackNavigator<RepairStackParams>();

export const RepairsStackScreen = () => (
	<RepairStack.Navigator>
		<RepairStack.Screen name="RepairScreen" component={Repair} options={{ title: i18n.t('repair') }} />
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
		<ConstructionStack.Screen name="ConstructionScreen" component={Repair} options={{ title: i18n.t('construction') }} />
	</ConstructionStack.Navigator>
);

/**
 * Objects
 */
type ObjectsStackParams = {
	ObjectsScreen: undefined;
};

const ObjectsStack = createStackNavigator<ObjectsStackParams>();

export const ObjectsStackScreen = () => (
	<ObjectsStack.Navigator>
		<ObjectsStack.Screen name="ObjectsScreen" component={Repair} options={{ title: i18n.t('objects') }} />
	</ObjectsStack.Navigator>
);

/**
 * Catalogs
 */

type CatalogsStackParams = {
	CatalogsScreen: undefined;
};

const CatalogsStack = createStackNavigator<CatalogsStackParams>();

export const CatalogsStackScreen = () => (
	<CatalogsStack.Navigator>
		<CatalogsStack.Screen name="CatalogsScreen" component={Catalogs} options={{ title: i18n.t('catalogs') }} />
	</CatalogsStack.Navigator>
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
		<MoreStack.Screen name="more" component={More} options={{ title: i18n.t('more') }} />
		<MoreStack.Screen name="settings" component={Settings} options={{ title: i18n.t('settings') }} />
		<MoreStack.Screen name="about" component={About} options={{ title: i18n.t('about') }} />
	</MoreStack.Navigator>
);
