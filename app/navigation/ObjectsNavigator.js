import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Objects } from "@components";
import React from "react";
import config from "@config";
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
        size={config.ICON_SIZE}
        color={tintColor}
      />
    );
  }
};

export default ObjectsStack;
