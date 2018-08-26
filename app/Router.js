import React from "react";
import { createStackNavigator } from "react-navigation";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { Construction, Dictionaries, More, Objects, Repairs } from "@screens";

const iconSize = 25;

const ConstructionStack = createStackNavigator({
  Construction: Construction
});

ConstructionStack.navigationOptions = {
  tabBarLabel: "Стройка",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons name="wall" size={iconSize} color={tintColor} />
    );
  }
};

const DictionariesStack = createStackNavigator({
  Dictionaries: Dictionaries
});

DictionariesStack.navigationOptions = {
  tabBarLabel: "Справочники",
  tabBarIcon: ({ tintColor }) => {
    return <FontAwesome name="book" size={iconSize} color={tintColor} />;
  }
};

const MoreStack = createStackNavigator({
  More: More
});

MoreStack.navigationOptions = {
  tabBarLabel: "Еще",
  tabBarIcon: ({ tintColor }) => {
    return (
      <Entypo name="dots-three-horizontal" size={iconSize} color={tintColor} />
    );
  }
};

const ObjectsStack = createStackNavigator({
  Objects: Objects
});

ObjectsStack.navigationOptions = {
  tabBarLabel: "Объекты",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons
        name="shape-square-plus"
        size={iconSize}
        color={tintColor}
      />
    );
  }
};

const RepairsStack = createStackNavigator({
  Repairs: Repairs
});

RepairsStack.navigationOptions = {
  tabBarLabel: "Ремонт",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons
        name="format-paint"
        size={iconSize}
        color={tintColor}
      />
    );
  }
};

const RouteConfigMap = {
  Repairs: RepairsStack,
  Construction: ConstructionStack,
  Objects: ObjectsStack,
  Dictionaries: DictionariesStack,
  More: MoreStack
};

export default RouteConfigMap;
