import { FormInput, FormLabel } from "react-native-elements";
import { StyleSheet, View } from "react-native";

import React from "react";
import { ValueType } from "@services";
import t from "tcomb-form-native";

const nameProp = "name";

const styles = StyleSheet.create({
  name: { fontSize: 18 }
});

export const Form = ({ ref, fields, value }) => {
  const data = { ...value };

  const fieldDef = {};
  const typeDef = {};
  if (data.hasOwnProperty(nameProp)) {
    typeDef[nameProp] = t.String;
  }

  const fieldTypes = fields || Object.entries(data);

  fieldTypes.forEach((v, k) => {
    fieldDef[k] = { label: v.name };

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
        ref={ref}
        type={t.struct(typeDef)}
        value={data}
        options={{ auto: "none", fields: fieldDef }}
      />
    </View>
  );
};
