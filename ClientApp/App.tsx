import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { migrate } from './preload';

export default class App extends Component {
  componentDidMount() {
    migrate();
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
