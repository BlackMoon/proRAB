import { Construction } from "@containers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import config from "@config";
import { createStackNavigator } from "react-navigation";

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

export default ConstructionStack;
