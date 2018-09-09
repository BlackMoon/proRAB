import { Entypo } from "@expo/vector-icons";
import { ICON_SIZE } from "@constants";
import { More } from "@components";
import React from "react";
import { createStackNavigator } from "react-navigation";

const MoreStack = createStackNavigator({
  More: More
});

MoreStack.navigationOptions = {
  tabBarLabel: "Еще",
  tabBarIcon: ({ tintColor }) => {
    return (
      <Entypo name="dots-three-horizontal" size={ICON_SIZE} color={tintColor} />
    );
  }
};

export default MoreStack;
