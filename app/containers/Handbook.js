import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ListItem } from "react-native-elements";
import { ListWithLoader } from "./withLoader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadHandbookRequest } from "@redux/actions";

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subtitle: {
    paddingLeft: 10,
    paddingTop: 5
  }
});

class HandbookContainer extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    this.props.actions.loadHandbookRequest(id);
  }
  renderItem = ({ item }, fields) => {
    let subtitle;
    if (fields) {
      subtitle = Array.from(fields).map(([k, v]) => (
        <View key={k} style={styles.field}>
          <Text>{v}:</Text>
          <Text>{item[k]}</Text>
        </View>
      ));
    }
    return (
      <ListItem
        title={item.name}
        subtitle={<View style={styles.subtitle}>{subtitle}</View>}
      />
    );
  };

  render() {
    const { handbook, loading } = this.props;
    return (
      <ListWithLoader
        loading={loading}
        items={handbook.records}
        renderItem={item => this.renderItem(item, handbook.fields)}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loadHandbookRequest }, dispatch)
});

const mapStateToProps = state => ({
  handbook: state.handbook.activeItem,
  loading: state.handbook.loading
});

const Handbook = connect(
  mapStateToProps,
  mapDispatchToProps
)(HandbookContainer);

export { Handbook };
