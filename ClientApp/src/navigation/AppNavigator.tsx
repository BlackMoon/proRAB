import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { ICON_SIZE } from 'config';
import i18n from '@localization';
import { RepairsStackScreen, ConstructionStackScreen, ProjectScreen, CatalogScreen, MoreStackScreen } from './Screens';
import LinkingConfiguration, { screens } from './LinkingConfiguration';

type BottomTabParams = { [Key in keyof typeof screens]: object };

const BottomTab = createBottomTabNavigator<BottomTabParams>();
const INITIAL_ROUTE_NAME = 'repair';

const AppNavigator = () => (
	<NavigationContainer linking={LinkingConfiguration}>
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="repair"
				component={RepairsStackScreen}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-paint" size={ICON_SIZE} color={color} />,
					title: i18n.t('routes.repair'),
				}}
			/>
			<BottomTab.Screen
				name="construction"
				component={ConstructionStackScreen}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="wall" size={ICON_SIZE} color={color} />,
					title: i18n.t('routes.construction'),
				}}
			/>
			<BottomTab.Screen
				name="objects"
				component={ProjectScreen}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="shape-square-plus" size={ICON_SIZE} color={color} />,
					title: i18n.t('routes.objects'),
				}}
			/>
			<BottomTab.Screen
				name="catalogs"
				component={CatalogScreen}
				options={{
					tabBarIcon: ({ color }) => <Entypo name="book" size={ICON_SIZE} color={color} />,
					title: i18n.t('routes.catalogs'),
				}}
			/>
			<BottomTab.Screen
				name="more"
				component={MoreStackScreen}
				options={{
					tabBarIcon: ({ color }) => <Entypo name="dots-three-horizontal" size={ICON_SIZE} color={color} />,
					title: i18n.t('routes.more'),
				}}
			/>
		</BottomTab.Navigator>
	</NavigationContainer>
);

export { AppNavigator };
