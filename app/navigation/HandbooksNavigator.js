import { Entypo } from "@expo/vector-icons";
import { HandbookList } from "@containers";
import { ICON_SIZE } from "@constants";
import React from "react";
import { createStackNavigator } from "react-navigation";

const HandbooksStack = createStackNavigator({
  Handbooks: HandbookList
});

HandbooksStack.navigationOptions = {
  tabBarLabel: "Справочники",
  tabBarIcon: ({ tintColor }) => {
    return <Entypo name="book" size={ICON_SIZE} color={tintColor} />;
  }
};

export default HandbooksStack;
