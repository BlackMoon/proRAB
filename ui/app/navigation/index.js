import {
  ConstructionStack,
  HandbooksStack,
  MoreStack,
  ObjectsStack,
  RepairsStack
} from "./Navigators";

import { createBottomTabNavigator } from "react-navigation";

const RouteConfigMap = {
  Repairs: RepairsStack,
  Construction: ConstructionStack,
  Objects: ObjectsStack,
  Handbooks: HandbooksStack,
  More: MoreStack
};

const AppNavigator = createBottomTabNavigator(RouteConfigMap, {
  initialRouteName: "Handbooks"
});

export default AppNavigator;
