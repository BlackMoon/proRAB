import React from "react";
import config from "@config";
import { createStackNavigator } from "react-navigation";
import { More } from "@components";
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

export default MoreStack;
