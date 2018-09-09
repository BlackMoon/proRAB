import ConstructionStack from "./ConstructionNavigator";
import HandbooksStack from "./HandbooksNavigator";
import MoreStack from "./MoreNavigator";
import ObjectsStack from "./ObjectsNavigator";
import RepairsStack from "./RepairsNavigator";
import { createBottomTabNavigator } from "react-navigation";

const RouteConfigMap = {
  Repairs: RepairsStack,
  Construction: ConstructionStack,
  Objects: ObjectsStack,
  Handbooks: HandbooksStack,
  More: MoreStack
};

const AppNavigator = createBottomTabNavigator(RouteConfigMap);

export default AppNavigator;
