import { FormInput, FormLabel } from "react-native-elements";
import { StyleSheet, View } from "react-native";

import { Field } from "redux-form";
import PropTypes from "prop-types";
import React from "react";
import { ValueType } from "@services";

const styles = StyleSheet.create({
  name: { fontSize: 18 }
});

const FormControl = ({ input, ...inputProps }) => {
  let formControl;
  if (type.valueType != ValueType.object) {
    let keyboardType = "default";
    switch (type.valueType) {
      case ValueType.numeric:
        keyboardType = "numeric";
        break;
      case ValueType.integer:
        keyboardType = "number-pad";
        break;
    }
    formControl = (
      <FormInput
        inputStyle={inputStyle}
        keyboardType={keyboardType}
        placeholder={type.name}
        value={input.value}
      />
    );
  } else {
    // todo dropdown
  }

  let formLabel;
  if (showLabel) {
    formLabel = <FormLabel>{type.name}</FormLabel>;
  }

  return (
    <View>
      {formLabel}
      {formControl}
    </View>
  );
};

const FormGroup = ({ entity, types }) => {
  return (
    <View>
      {Array.from(types).map(([k, v]) => (
        <FormControl key={k} type={v} value={entity[k]} />
      ))}
    </View>
  );
};

export const Form = ({ entity, types }) => {
  const state = { ...entity };
  let nameControl;
  if (!state.hasOwnProperty("name")) {
    nameControl = (
      <Field name="name">
        <FormControl value={state.name} types={types} />
      </Field>
    );
  }

  const propTypes = types || Object.entries(state);
  return <View>{nameControl}</View>;
};
