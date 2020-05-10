import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { repair } from '../containers/repair';

/**
 * Repairs
 */
type RepairStackParams = {
	RepairScreen: undefined;
};

const RepairStack = createStackNavigator<RepairStackParams>();

export const RepairsStackScreen = () => (
	<RepairStack.Navigator>
		<RepairStack.Screen name="RepairScreen" component={repair} options={{ title: 'Ремонт' }} />
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
		<ConstructionStack.Screen name="ConstructionScreen" component={repair} options={{ title: 'Стройка' }} />
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
		<ObjectsStack.Screen name="ObjectsScreen" component={repair} options={{ title: 'Объекты' }} />
	</ObjectsStack.Navigator>
);
