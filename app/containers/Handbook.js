import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ICON_SIZE } from "@constants";
import { ListItem } from "react-native-elements";
import { ListWithLoader } from "./withLoader";
import { MaterialIcons } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadRecordsRequest } from "@redux/actions";

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    paddingRight: 10
  },
  subtitle: {
    paddingLeft: 10,
    paddingTop: 5
  },
  title: { fontSize: 18, paddingLeft: 10 }
});

class HandbookContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const handleAdd = navigation.getParam("handleAdd");

    return {
      headerRight: (
        <MaterialIcons
          style={styles.header}
          name="add"
          color="#007aff"
          size={ICON_SIZE}
          onPress={() => handleAdd()}
        />
      )
    };
  };

  add() {
    const { fields, table, navigation } = this.props;
    navigation.navigate("Details", {
      item: { name: null },
      fields: fields,
      table: table
    });
  }

  componentDidMount() {
    const { actions, navigation } = this.props;

    const id = navigation.getParam("id");
    actions.loadRecordsRequest(id);
    navigation.setParams({ handleAdd: this.add.bind(this) });
  }

  itemPress = (item, fields, table) => {
    this.props.navigation.navigate("Details", { item, fields, table });
  };

  renderItem = ({ item }, fields, table) => {
    let subtitle;
    if (fields) {
      subtitle = Array.from(fields).map(([k, v]) => (
        <View key={k} style={styles.field}>
          <Text>{v.name}:</Text>
          <Text>{item[k]}</Text>
        </View>
      ));
    }
    return (
      <ListItem
        onPress={this.itemPress.bind(this, item, fields, table)}
        style={styles.title}
        subtitle={<View style={styles.subtitle}>{subtitle}</View>}
        title={<Text style={styles.title}>{item.name}</Text>}
      />
    );
  };

  render() {
    const { fields, records, table, loading } = this.props;
    return (
      <ListWithLoader
        loading={loading}
        items={records}
        renderItem={item => this.renderItem(item, fields, table)}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loadRecordsRequest }, dispatch)
});

const mapStateToProps = state => ({
  fields: state.records.fields,
  records: state.records.items,
  table: state.records.table,
  loading: state.records.loading
});

const Handbook = connect(
  mapStateToProps,
  mapDispatchToProps
)(HandbookContainer);

export { Handbook };
