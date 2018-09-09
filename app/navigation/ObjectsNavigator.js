import { ICON_SIZE } from "@constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Objects } from "@components";
import React from "react";
import { createStackNavigator } from "react-navigation";

const ObjectsStack = createStackNavigator({
  Objects: Objects
});

ObjectsStack.navigationOptions = {
  tabBarLabel: "Объекты",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons
        name="shape-square-plus"
        size={ICON_SIZE}
        color={tintColor}
      />
    );
  }
};

export default ObjectsStack;
