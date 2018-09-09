import { Dictionaries } from "@containers";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import config from "@config";
import { createStackNavigator } from "react-navigation";

const DictionariesStack = createStackNavigator({
  Dictionaries: Dictionaries
});

DictionariesStack.navigationOptions = {
  tabBarLabel: "Справочники",
  tabBarIcon: ({ tintColor }) => {
    return <Entypo name="book" size={config.ICON_SIZE} color={tintColor} />;
  }
};

export default DictionariesStack;
