import React, { Component } from "react";
import { loadHandbooksRequest, loadHandbooksSuccess } from "@redux/actions";

import { List } from "@components";
import { ListItem } from "react-native-elements";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withLoader } from "./withLoader";

const ListWithLoader = withLoader(List);

const handbookListItem = ({ item }) => (
  <ListItem
    leftIcon={{
      name: "folder",
      type: "FontAwesome"
    }}
    title={item.name}
  />
);

class HandbookList extends Component {
  componentDidMount() {
    this.props.actions.loadHandbooksRequest();
  }
  render() {
    const { handbooks, loading } = this.props;
    return (
      <ListWithLoader
        items={handbooks}
        loading={loading}
        renderItem={handbookListItem}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { loadHandbooksRequest, loadHandbooksSuccess },
    dispatch
  )
});
const mapStateToProps = state => ({
  handbooks: state.handbook.items,
  loading: state.handbook.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandbookList);
