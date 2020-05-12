import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ICON_SIZE } from '@constants';
import i18n from '../localization';
import { repair } from '../containers/repair';
import { RepairsStackScreen, ConstructionStackScreen, ObjectsStackScreen } from './Screens';
import { routes } from './LinkingConfiguration';

type BottomTabParams = { [Key in keyof typeof routes]: undefined };

const BottomTab = createBottomTabNavigator<BottomTabParams>();
const INITIAL_ROUTE_NAME = 'repair';

const AppNavigator = () => (
	<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
		<BottomTab.Screen
			name="repair"
			component={RepairsStackScreen}
			options={{
				tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-paint" size={ICON_SIZE} color={color} />,
				title: i18n.t('repair'),
			}}
		/>
		<BottomTab.Screen
			name="construction"
			component={ConstructionStackScreen}
			options={{
				tabBarIcon: ({ color }) => <MaterialCommunityIcons name="wall" size={ICON_SIZE} color={color} />,
				title: i18n.t('construction'),
			}}
		/>
		<BottomTab.Screen
			name="objects"
			component={ObjectsStackScreen}
			options={{
				tabBarIcon: ({ color }) => <MaterialCommunityIcons name="shape-square-plus" size={ICON_SIZE} color={color} />,
				title: i18n.t('objects'),
			}}
		/>
		<BottomTab.Screen
			name="catalogs"
			component={repair}
			options={{
				tabBarIcon: ({ color }) => <Entypo name="book" size={ICON_SIZE} color={color} />,
				title: i18n.t('catalogues'),
			}}
		/>
		<BottomTab.Screen
			name="more"
			component={repair}
			options={{
				tabBarIcon: ({ color }) => <Entypo name="dots-three-horizontal" size={ICON_SIZE} color={color} />,
				title: i18n.t('more'),
			}}
		/>
	</BottomTab.Navigator>
);

export default AppNavigator;
