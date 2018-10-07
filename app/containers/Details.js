import { Button, View } from "react-native";
import React, { Component } from "react";
import { loadRecordRequest, updateRecordRequest } from "@redux/actions";

import { ValueType } from "@services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import t from "tcomb-form-native";

const nameProp = "name";

class DetailsContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const handleSave = navigation.getParam("handleSave");
    return {
      headerRight: <Button onPress={() => handleSave()} title="Сохранить" />
    };
  };

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { actions, navigation } = this.props;
    actions.loadRecordRequest(
      navigation.getParam("item"),
      navigation.getParam("fields"),
      navigation.getParam("table")
    );
    navigation.setParams({ handleSave: this.handleSubmit.bind(this) });
  }

  handleSubmit = () => {
    const { actions, item, table } = this.props;
    const record = { ...item, ...this._form.getValue() };
    actions.updateRecordRequest(record, table);
  };

  render() {
    const { fields, goBack, item, navigation } = this.props;

    if (goBack) {
      navigation.goBack();
    }

    const fieldDef = {};
    const typeDef = {};
    const value = { ...item };

    if (value.hasOwnProperty(nameProp)) {
      fieldDef[nameProp] = { placeholder: "Наименование" };
      typeDef[nameProp] = t.String;
    }

    const fieldTypes = fields || Object.entries(value);

    fieldTypes.forEach((v, k) => {
      fieldDef[k] = { label: v.name, placeholder: v.name };

      switch (v.valueType) {
        case ValueType.integer:
        case ValueType.numeric:
          typeInfo = t.Number;
          break;
        default:
          typeInfo = t.String;
          break;
      }

      typeDef[k] = typeInfo;
    });

    return (
      <View>
        <t.form.Form
          ref={c => (this._form = c)}
          type={t.struct(typeDef)}
          value={value}
          options={{ auto: "none", fields: fieldDef }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { loadRecordRequest, updateRecordRequest },
    dispatch
  )
});

const mapStateToProps = state => ({
  goBack: state.records.goBack,
  fields: state.records.fields,
  item: state.records.item,
  table: state.records.table
});

const Details = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsContainer);

export { Details };
