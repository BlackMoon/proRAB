import React from "react";
import { createStackNavigator } from "react-navigation";
import config from "@config";
import { Objects } from "@screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export { ObjectsStack };
