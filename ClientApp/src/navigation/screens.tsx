import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { About, CatalogItem, CatalogList, More, Settings } from '@components';
import i18n from '@localization';
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
};

const ObjectsStack = createStackNavigator<ObjectsStackParams>();

export const ObjectsStackScreen = () => (
	<ObjectsStack.Navigator>
		<ObjectsStack.Screen name="ObjectsScreen" component={Repair} options={{ title: i18n.t('routes.objects') }} />
	</ObjectsStack.Navigator>
);

/**
 * Catalogs
 */

type CatalogsStackParams = {
	catalog: { catalogId: number; catalogName: string };
	catalogs: undefined;
	record: undefined;
};

export type CatalogScreenRouteProp = RouteProp<CatalogsStackParams, 'catalog'>;
export type CatalogsScreenNavigatorProp = StackNavigationProp<CatalogsStackParams>;

const CatalogsStack = createStackNavigator<CatalogsStackParams>();

export const CatalogsStackScreen = () => (
	<CatalogsStack.Navigator initialRouteName="catalogs">
		<CatalogsStack.Screen
			name="catalog"
			component={CatalogItem}
			options={({ route, navigation }) => ({
				headerRight: ({ tintColor }) => (
					<Icon style={{ paddingEnd: 15 }} name="md-add" type="ionicon" color="systemBlue" onPress={() => navigation.navigate('record')} />
				),
			})}
		/>
		<CatalogsStack.Screen name="catalogs" component={CatalogList} options={{ title: i18n.t('routes.catalogs') }} />
		<CatalogsStack.Screen name="record" component={Repair} />
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
		<MoreStack.Screen name="more" component={More} options={{ title: i18n.t('routes.more') }} />
		<MoreStack.Screen name="settings" component={Settings} options={{ title: i18n.t('routes.settings') }} />
		<MoreStack.Screen name="about" component={About} options={{ title: i18n.t('routes.about') }} />
	</MoreStack.Navigator>
);
