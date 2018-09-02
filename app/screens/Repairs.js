import React, { Component } from "react";
import GridView from "react-native-super-grid";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from "react-native";
import * as RepairsActions from "@redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Repairs extends Component {
  _onPress(item) {
    this.props.actions.addRepair("item");
    Alert.alert(item.name);
  }

  render() {
    const items = [
      { name: "TURQUOISE", code: "#1abc9c" },
      { name: "EMERALD", code: "#2ecc71" },
      { name: "PETER RIVER", code: "#3498db" },
      { name: "AMETHYST", code: "#9b59b6" },
      { name: "WET ASPHALT", code: "#34495e" },
      { name: "GREEN SEA", code: "#16a085" },
      { name: "NEPHRITIS", code: "#27ae60" },
      { name: "BELIZE HOLE", code: "#2980b9" },
      { name: "WISTERIA", code: "#8e44ad" },
      { name: "MIDNIGHT BLUE", code: "#2c3e50" },
      { name: "SUN FLOWER", code: "#f1c40f" },
      { name: "CARROT", code: "#e67e22" },
      { name: "ALIZARIN", code: "#e74c3c" },
      { name: "CLOUDS", code: "#ecf0f1" },
      { name: "CONCRETE", code: "#95a5a6" },
      { name: "ORANGE", code: "#f39c12" },
      { name: "PUMPKIN", code: "#d35400" },
      { name: "POMEGRANATE", code: "#c0392b" },
      { name: "SILVER", code: "#bdc3c7" },
      { name: "ASBESTOS", code: "#7f8c8d" }
    ];

    return (
      <GridView
        itemDimension={130}
        items={items}
        style={styles.gridView}
        renderItem={item => (
          <TouchableHighlight
            onPress={() => this._onPress(item)}
            underlayColor="white"
          >
            <View
              style={[styles.itemContainer, { backgroundColor: item.code }]}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

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

const WrappedRepairs = connect(
  state => ({
    state: state.counter
  }),
  dispatch => ({
    actions: bindActionCreators(RepairsActions, dispatch)
  })
)(Repairs);

export { WrappedRepairs as Repairs };
