import { ActivityIndicator, StyleSheet } from "react-native";
import { Grid, List } from "@components";

import React from "react";

export const withLoader = (WrappedComponent, size = "large") => ({ loading, ...props }) => {
  if (loading) {
    return <ActivityIndicator size={size} style={styles.activityIndicator} />;
  }
  return <WrappedComponent {...props} />;
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1
  }
});

export const GridWithLoader = withLoader(Grid);
export const ListWithLoader = withLoader(List);
