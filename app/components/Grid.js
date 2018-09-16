import GridView from "react-native-super-grid";
import React from "react";
import { StyleSheet } from "react-native";

export const Grid = ({ items, renderItem, itemDimension = 130 }) => {
  <GridView
    itemDimension={itemDimension}
    items={items}
    style={styles.gridView}
    renderItem={renderItem}
  />;
};

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
