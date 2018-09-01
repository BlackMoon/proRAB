import { createBottomTabNavigator } from "react-navigation";
import {
  ConstructionStack,
  DictionariesStack,
  MoreStack,
  ObjectsStack,
  RepairsStack
} from "@navigation";

const RouteConfigMap = {
  Repairs: RepairsStack,
  Construction: ConstructionStack,
  Objects: ObjectsStack,
  Dictionaries: DictionariesStack,
  More: MoreStack
};

const AppNavigator = createBottomTabNavigator(RouteConfigMap);

export { AppNavigator };
