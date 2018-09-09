import React, { Component } from "react";

import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

const handbookListItem = ({ item }) => (
  <ListItem
    leftIcon={{
      name: "folder",
      type: "FontAwesome"
    }}
    title={item.name}
  />
);

export class HandbookList extends Component {
  componentDidMount() {
    this.props.actions.loadHandbooksRequest();
  }

  render() {
    const { handbooks } = this.props;
    return (
      <FlatList
        data={handbooks}
        keyExtractor={h => h.id.toString()}
        renderItem={handbookListItem}
      />
    );
  }
}

HandbookList.defaultProps = {
  handbooks: []
};
