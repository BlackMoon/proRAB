import { Button, Text, View } from "react-native";
import React, { Component } from "react";

export class Construction extends Component {
  static navigationOptions = {
    headerRight: <Button color="#fff" onPress={() => {}} title="Сохранить" />
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Construction</Text>
      </View>
    );
  }
}
