import { createBottomTabNavigator } from "react-navigation";
import ConstructionStack from "./ConstructionNavigator";
import DictionariesStack from "./DictionariesNavigator";
import MoreStack from "./MoreNavigator";
import ObjectsStack from "./ObjectsNavigator";
import RepairsStack from "./RepairsNavigator";

const RouteConfigMap = {
  Repairs: RepairsStack,
  Construction: ConstructionStack,
  Objects: ObjectsStack,
  Dictionaries: DictionariesStack,
  More: MoreStack
};

const AppNavigator = createBottomTabNavigator(RouteConfigMap);

export default AppNavigator;
