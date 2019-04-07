import { FlatList } from "react-native";
import PropTypes from "prop-types";
import React from "react";

export const List = ({ items, renderItem, ...props }) => (
  <FlatList
    data={items}
    keyExtractor={item => item.id.toString()}
    renderItem={renderItem}
    {...props}
  />
);

List.defaultProps = {
  items: []
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
};
