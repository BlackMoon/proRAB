import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import {
	About,
	AggregateItem,
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

type AggregationStackParams = {
	aggregate: { aggregateId: number };
};

/**
 * Repairs
 */
type RepairStackParams = AggregationStackParams & {
	repair: undefined;
};

const RepairStack = createStackNavigator<RepairStackParams>();

export type AggregationScreenNavigatorProp = StackNavigationProp<AggregationStackParams>;

export const RepairsStackScreen = () => (
	<RepairStack.Navigator>
		<RepairStack.Screen name="repair" component={RepairList} options={{ title: i18n.t('routes.repair') }} />
		<RepairStack.Screen name="aggregate" component={AggregateItem} />
	</RepairStack.Navigator>
);

/**
 * Construction
 */
type ConstructionStackParams = AggregationStackParams & {
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
type ProjectMainStackParams = {
	projects: undefined;
};

const ProjectMainStack = createStackNavigator<ProjectMainStackParams>();

export const ProjectMainScreen = () => (
	<ProjectMainStack.Navigator>
		<ProjectMainStack.Screen
			name="projects"
			component={ProjectList}
			options={({ route, navigation }) => ({
				headerRight: () => (
					<Icon style={{ paddingEnd: 15 }} name="md-add" type="ionicon" onPress={() => navigation.navigate('project', {})} />
				),
				title: i18n.t('routes.objects'),
			})}
		/>
	</ProjectMainStack.Navigator>
);

type ProjectStackParams = {
	main: undefined;
	project: { projectId?: number };
};

const ProjectStack = createStackNavigator<ProjectStackParams>();

export type ProjectdScreenRouteProp = RouteProp<ProjectStackParams, 'project'>;
export type ProjectScreenNavigatorProp = StackNavigationProp<ProjectStackParams>;

export const ProjectScreen = () => (
	<ProjectStack.Navigator initialRouteName="main" mode="modal">
		<ProjectStack.Screen name="main" component={ProjectMainScreen} options={{ headerShown: false, title: i18n.t('cancel') }} />
		<ProjectStack.Screen
			name="project"
			component={ProjectItem}
			options={({ route, navigation }) => {
				const { projectId } = route.params;
				return {
					headerLeft: () => (
						<HeaderBackButton
							backImage={() => <View></View>}
							label={i18n.t('cancel')}
							onPress={() => navigation.goBack()}
						></HeaderBackButton>
					),
					title: i18n.t(projectId ? 'project.edit' : 'project.new'),
				};
			}}
		/>
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

export const CatalogMainScreen = () => (
	<CatalogMainStack.Navigator initialRouteName="catalogs">
		<CatalogMainStack.Screen
			name="catalog"
			component={CatalogItem}
			options={({ route, navigation }) => ({
				headerRight: () => (
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

export const CatalogScreen = () => (
	<CatalogStack.Navigator initialRouteName="main" mode="modal">
		<CatalogStack.Screen name="main" component={CatalogMainScreen} options={{ headerShown: false, title: i18n.t('cancel') }} />
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
