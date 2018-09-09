import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Repairs } from "@containers";
import config from "@config";
import { createStackNavigator } from "react-navigation";

const RepairsStack = createStackNavigator({
  Repairs: Repairs
});

RepairsStack.navigationOptions = {
  tabBarLabel: "Ремонт",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons
        name="format-paint"
        size={config.ICON_SIZE}
        color={tintColor}
      />
    );
  }
};

export default RepairsStack;
