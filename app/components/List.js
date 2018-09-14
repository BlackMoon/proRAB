import { FlatList } from "react-native";
import PropTypes from "prop-types";
import React from "react";

export const List = ({ items, renderItem }) => (
  <FlatList
    data={items}
    keyExtractor={item => item.id.toString()}
    renderItem={renderItem}
  />
);

List.propTypes = {
  items: PropTypes.array.isRequired
};
