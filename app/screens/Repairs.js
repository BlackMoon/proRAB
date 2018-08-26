import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataService } from "@services";

export class Repairs extends Component {
  constructor() {
    super();

    let f = new Function("a, b", "if (a < 10) {a = 101;} return a + b");
    this.expr = f(1, 1);
    this.ds = new DataService();
  }

  render() {
    this.ds.getAll();
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.expr}</Text>
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
