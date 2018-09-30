import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ICON_SIZE } from "@constants";
import { ListItem } from "react-native-elements";
import { ListWithLoader } from "./withLoader";
import { MaterialIcons } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadHandbookRequest } from "@redux/actions";

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

  /**
   * Добавить новую сущность
   */
  add() {
    const { handbook, navigation } = this.props;
    navigation.navigate("Details", { types: handbook.fields });
  }

  componentDidMount() {
    const { navigation } = this.props;

    const id = navigation.getParam("id");
    this.props.actions.loadHandbookRequest(id);
    navigation.setParams({ handleAdd: this.add.bind(this) });
  }

  itemPress = (item, fields) => {
    this.props.navigation.navigate("Details", { entity: item, types: fields });
  };

  renderItem = ({ item }, fields) => {
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
        onPress={this.itemPress.bind(this, item, fields)}
        style={styles.title}
        subtitle={<View style={styles.subtitle}>{subtitle}</View>}
        title={<Text style={styles.title}>{item.name}</Text>}
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
