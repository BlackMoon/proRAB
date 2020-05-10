import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { repair } from '../containers/repair';

/**
 * Repairs
 */
const RepairStack = createStackNavigator();

export const RepairsStackScreen = () => (
	<RepairStack.Navigator>
		<RepairStack.Screen name="RepairScreen" component={repair} options={{ title: 'Ремонт' }} />
	</RepairStack.Navigator>
);
