import React from "react";
import { createStackNavigator } from "react-navigation";
import config from "@config";
import { More } from "@screens";
import { Entypo } from "@expo/vector-icons";

const MoreStack = createStackNavigator({
  More: More
});

MoreStack.navigationOptions = {
  tabBarLabel: "Еще",
  tabBarIcon: ({ tintColor }) => {
    return (
      <Entypo
        name="dots-three-horizontal"
        size={config.ICON_SIZE}
        color={tintColor}
      />
    );
  }
};

export { MoreStack };
