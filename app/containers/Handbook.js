import { Button, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { loadRecordsRequest, toggleRecordsEditMode } from "@redux/actions";

import { ListItem } from "react-native-elements";
import { ListWithLoader } from "./withLoader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
    const { params = {} } = navigation.state;
    const { editMode, handleEdit } = params;
    let header = {
      headerRight: (
        <Button
          onPress={() => handleEdit()}
          title={editMode ? "Отмена" : "Править"}
        />
      )
    };
    if (editMode) {
      header.headerLeft = null;
    }
    return header;
  };

  add() {
    const { fields, table, navigation } = this.props;
    navigation.navigate("Details", {
      item: { name: null },
      fields: fields,
      table: table
    });
  }

  edit() {
    const { actions, editMode, navigation } = this.props;
    actions.toggleRecordsEditMode();
    navigation.setParams({ editMode: !editMode });
  }

  componentDidMount() {
    const { actions, navigation } = this.props;

    this.willFocusListener = navigation.addListener("willFocus", () => {
      actions.loadRecordsRequest(navigation.getParam("id"));
    });

    navigation.setParams({ handleEdit: this.edit.bind(this) });
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  itemPress = item => {
    const { editMode, fields, table } = this.props;
    if (!editMode) {
      this.props.navigation.navigate("Details", { item, fields, table });
    }
  };

  renderItem = ({ item }) => {
    const { editMode, fields } = this.props;
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
        hideChevron={editMode}
        onPress={this.itemPress.bind(this, item)}
        style={styles.title}
        subtitle={<View style={styles.subtitle}>{subtitle}</View>}
        title={<Text style={styles.title}>{item.name}</Text>}
      />
    );
  };

  render() {
    const { editMode, records, loading } = this.props;
    return (
      <View>
        {editMode ? (
          <ListItem
            hideChevron={true}
            leftIcon={{
              name: "add-circle-outline",
              type: "MaterialIcons"
            }}
            onPress={this.add.bind(this)}
            title="Добавить"
          />
        ) : null}
        <ListWithLoader
          extraData={this.props}
          loading={loading}
          items={records}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { loadRecordsRequest, toggleRecordsEditMode },
    dispatch
  )
});

const mapStateToProps = state => ({
  editMode: state.records.editMode,
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
