import React from "react";
import { createStackNavigator } from "react-navigation";
import config from "@config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Construction } from "@screens";

const ConstructionStack = createStackNavigator({
  Construction: Construction
});

ConstructionStack.navigationOptions = {
  tabBarLabel: "Стройка",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons
        name="wall"
        size={config.ICON_SIZE}
        color={tintColor}
      />
    );
  }
};

export { ConstructionStack };
