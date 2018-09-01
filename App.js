import React, { Component } from "react";
import { AppLoading } from "expo";
import { AppNavigator } from "@navigation";
import { copyDbAsync } from "./app/preload/copyDb";

export default class App extends Component {
  state = {
    isReady: false
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={copyDbAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <AppNavigator />;
  }
}
