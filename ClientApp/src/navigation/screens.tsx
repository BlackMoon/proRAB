import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import {
	About,
	CatalogItem,
	CatalogList,
	ConstructionList,
	More,
	ProjectItem,
	ProjectList,
	RecordItem,
	RepairList,
	Settings,
} from '@components';
import i18n from '@localization';

/**
 * Repairs
 */
type RepairStackParams = {
	repair: undefined;
};

const RepairStack = createStackNavigator<RepairStackParams>();

export const RepairsStackScreen = () => (
	<RepairStack.Navigator>
		<RepairStack.Screen name="repair" component={RepairList} options={{ title: i18n.t('routes.repair') }} />
	</RepairStack.Navigator>
);

/**
 * Construction
 */
type ConstructionStackParams = {
	construction: undefined;
};

const ConstructionStack = createStackNavigator<ConstructionStackParams>();

export const ConstructionStackScreen = () => (
	<ConstructionStack.Navigator>
		<ConstructionStack.Screen name="construction" component={ConstructionList} options={{ title: i18n.t('routes.construction') }} />
	</ConstructionStack.Navigator>
);

/**
 * Projects
 */
type ProjectsStackParams = {
	project: { projectId: number };
	projects: undefined;
};

const ProjectStack = createStackNavigator<ProjectsStackParams>();

export type ProjectScreenNavigatorProp = StackNavigationProp<ProjectsStackParams>;
export type ProjectdScreenRouteProp = RouteProp<ProjectsStackParams, 'project'>;

export const ProjectStackScreen = () => (
	<ProjectStack.Navigator initialRouteName="projects">
		<ProjectStack.Screen name="project" component={ProjectItem} />
		<ProjectStack.Screen name="projects" component={ProjectList} options={{ title: i18n.t('routes.objects') }} />
	</ProjectStack.Navigator>
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
