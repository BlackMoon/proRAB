import React, { Component } from "react";

import { ListItem } from "react-native-elements";
import { ListWithLoader } from "./withLoader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadHandbooksRequest } from "@redux/actions";

class HandbookListContainer extends Component {
  componentDidMount() {
    this.props.actions.loadHandbooksRequest();
  }

  itemPress = item => {
    this.props.navigation.navigate("Handbook", { id: item.id });
  };

  renderItem = ({ item }) => (
    <ListItem
      leftIcon={{
        name: "folder",
        type: "FontAwesome"
      }}
      onPress={this.itemPress.bind(this, item)}
      title={item.name}
    />
  );

  render() {
    const { handbooks, loading } = this.props;
    return (
      <ListWithLoader
        items={handbooks}
        loading={loading}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loadHandbooksRequest }, dispatch)
});
const mapStateToProps = state => ({
  handbooks: state.handbook.items,
  loading: state.handbook.loading
});

const HandbookList = connect(
  mapStateToProps,
  mapDispatchToProps
)(HandbookListContainer);

export { HandbookList };
