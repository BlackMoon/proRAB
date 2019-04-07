import React, { Component } from "react";

import { AppLoading } from "expo";
import AppNavigator from "@navigation";
import { Provider } from "react-redux";
import { copyDbAsync } from "@preload";
import store from "@redux";

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

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
