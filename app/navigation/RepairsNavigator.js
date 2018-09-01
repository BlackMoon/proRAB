import React from "react";
import { createStackNavigator } from "react-navigation";
import config from "@config";
import { Repairs } from "@screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export { RepairsStack };
