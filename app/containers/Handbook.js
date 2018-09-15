import React, { Component } from "react";

import { ListItem } from "react-native-elements";
import { ListWithLoader } from "./withLoader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Handbook extends Component {
  render() {
    const { rows, loading } = this.props;
    return <ListWithLoader loading={loading} items={rows} />;
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
)(Handbook);
