import {
  Construction,
  Details,
  Handbook,
  HandbookList,
  Repairs
} from "@containers";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { ICON_SIZE } from "@constants";
import React from "react";
import { createStackNavigator } from "react-navigation";

/**
 * Construction
 */
const ConstructionStack = createStackNavigator({
  Construction: Construction
});

ConstructionStack.navigationOptions = {
  tabBarLabel: "Стройка",
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons name="wall" size={ICON_SIZE} color={tintColor} />
  )
};

/**
 * Handbooks
 */
const HandbooksStack = createStackNavigator(
  {
    Details: Details,
    Handbook: Handbook,
    Handbooks: HandbookList
  },
  {
    initialRouteName: "Handbooks",
    initialRouteParams: { id: 1 }
  }
);

HandbooksStack.navigationOptions = {
  tabBarLabel: "Справочники",
  tabBarIcon: ({ tintColor }) => (
    <Entypo name="book" size={ICON_SIZE} color={tintColor} />
  )
};

/**
 * More
 */
const MoreStack = createStackNavigator({
  More: Construction
});

MoreStack.navigationOptions = {
  tabBarLabel: "Еще",
  tabBarIcon: ({ tintColor }) => (
    <Entypo name="dots-three-horizontal" size={ICON_SIZE} color={tintColor} />
  )
};

/**
 * Objects
 */
const ObjectsStack = createStackNavigator({
  Objects: Construction
});

ObjectsStack.navigationOptions = {
  tabBarLabel: "Объекты",
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons
      name="shape-square-plus"
      size={ICON_SIZE}
      color={tintColor}
    />
  )
};

/**
 * Repairs
 */
const RepairsStack = createStackNavigator({
  Repairs: Repairs
});

RepairsStack.navigationOptions = {
  tabBarLabel: "Ремонт",
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons
      name="format-paint"
      size={ICON_SIZE}
      color={tintColor}
    />
  )
};

export {
  ConstructionStack,
  HandbooksStack,
  MoreStack,
  ObjectsStack,
  RepairsStack
};
