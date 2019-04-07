import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { ValueType } from "@services";
import t from "tcomb-form-native";

const nameProp = "name";

const styles = StyleSheet.create({
  name: { fontSize: 18 }
});

export class Form extends Component {
  handleSubmit = () => ({ ...this.props.item, ...this._form.getValue() });

  render() {
    const { fields, item } = this.props;

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
