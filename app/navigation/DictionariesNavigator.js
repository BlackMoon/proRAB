import React from "react";
import { createStackNavigator } from "react-navigation";
import config from "@config";
import { Dictionaries } from "@screens";
import { FontAwesome } from "@expo/vector-icons";

const DictionariesStack = createStackNavigator({
  Dictionaries: Dictionaries
});

DictionariesStack.navigationOptions = {
  tabBarLabel: "Справочники",
  tabBarIcon: ({ tintColor }) => {
    return (
      <FontAwesome name="book" size={config.ICON_SIZE} color={tintColor} />
    );
  }
};

export { DictionariesStack };
