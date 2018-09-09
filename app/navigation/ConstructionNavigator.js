import { Construction } from "@containers";
import { ICON_SIZE } from "@constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { createStackNavigator } from "react-navigation";

const ConstructionStack = createStackNavigator({
  Construction: Construction
});

ConstructionStack.navigationOptions = {
  tabBarLabel: "Стройка",
  tabBarIcon: ({ tintColor }) => {
    return (
      <MaterialCommunityIcons name="wall" size={ICON_SIZE} color={tintColor} />
    );
  }
};

export default ConstructionStack;
