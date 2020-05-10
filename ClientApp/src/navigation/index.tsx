import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ICON_SIZE } from '../constants';
import { repair } from '../containers/repair';
import { RepairsStackScreen } from './screens';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Repair';

const AppNavigator = () => (
	<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
		<BottomTab.Screen
			name="Repair"
			component={RepairsStackScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons
						name="format-paint"
						size={ICON_SIZE}
						color={color}
					/>
				),
				tabBarLabel: 'Ремонт',
			}}
		/>
		<BottomTab.Screen
			name="Construction"
			component={repair}
			options={{
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons name="wall" size={ICON_SIZE} color={color} />
				),
				tabBarLabel: 'Стройка',
			}}
		/>
		<BottomTab.Screen
			name="Objects"
			component={repair}
			options={{
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons
						name="shape-square-plus"
						size={ICON_SIZE}
						color={color}
					/>
				),
				tabBarLabel: 'Объекты',
			}}
		/>
		<BottomTab.Screen
			name="Catalogs"
			component={repair}
			options={{
				tabBarIcon: ({ color }) => (
					<Entypo name="book" size={ICON_SIZE} color={color} />
				),
				tabBarLabel: 'Справочники',
			}}
		/>
		<BottomTab.Screen
			name="More"
			component={repair}
			options={{
				tabBarIcon: ({ color }) => (
					<Entypo name="dots-three-horizontal" size={ICON_SIZE} color={color} />
				),
				tabBarLabel: 'Еще',
			}}
		/>
	</BottomTab.Navigator>
);

export default AppNavigator;
