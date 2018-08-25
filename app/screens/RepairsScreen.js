import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export class RepairsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Repairs</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
