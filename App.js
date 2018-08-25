import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import {
  Entypo,
  EvilIcons,
  Feather,
  Foundation,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import {
  ConstructionScreen,
  DictionariesScreen,
  MoreScreen,
  ObjectsScreen,
  RepairsScreen
} from "./app/screens";

import Navigator from "./app/navigator.json";

// Stack navigators
const ConstructionStack = createStackNavigator({
  Construction: ConstructionScreen
});

ConstructionStack.navigationOptions = {
  tabBarLabel: "Стройка",
  tabBarIcon: ({ tintColor }) => {
    return <MaterialCommunityIcons name="wall" size={25} color={tintColor} />;
  }
};

const DictionariesStack = createStackNavigator({
  Dictionaries: DictionariesScreen
});

DictionariesStack.navigationOptions = {
  tabBarLabel: "Справочники",
  tabBarIcon: ({ tintColor }) => {
    return <FontAwesome name="book" size={25} color={tintColor} />;
  }
};

const MoreStack = createStackNavigator({
  More: MoreScreen
});

MoreStack.navigationOptions = {
  tabBarLabel: "Еще",
  tabBarIcon: ({ tintColor }) => {
    return <Entypo name="dots-three-horizontal" size={25} color={tintColor} />;
  }
};

const ObjectsStack = createStackNavigator({
  Objects: ObjectsScreen
});

ObjectsStack.navigationOptions = {
  tabBarLabel: "Объекты",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons
        name="shape-square-plus"
        size={25}
        color={tintColor}
      />
    );
  }
};

const RepairsStack = createStackNavigator({
  Repairs: RepairsScreen
});

RepairsStack.navigationOptions = {
  tabBarLabel: "Ремонт",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons name="format-paint" size={25} color={tintColor} />
    );
  }
};

export default createBottomTabNavigator({
  Repairs: RepairsStack,
  Construction: ConstructionStack,
  Objects: ObjectsStack,
  Dictionaries: DictionariesStack,
  More: MoreStack
});
