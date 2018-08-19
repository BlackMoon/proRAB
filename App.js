import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  TabBarBottom
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./app/screens/HomeScreen";
import SettingsScreen from "./app/screens/SettingsScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: HomeScreen
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Details: SettingsScreen
});

export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack
  },
  {
    /* Other configuration remains unchanged */
  }
);
