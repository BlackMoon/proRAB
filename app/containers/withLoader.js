import { ActivityIndicator, StyleSheet } from "react-native";

import React from "react";

export const withLoader = WrappedComponent => ({ loading, ...props }) => {
  if (loading) {
    return <ActivityIndicator style={styles.activityIndicator} />;
  }
  return <WrappedComponent {...props} />;
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1
  }
});
