import React, { Component } from "react";

import { Button } from "react-native";
import { Form } from "@components";
import { reduxForm } from "redux-form";

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
    const { handleSubmit, initialize, navigation } = this.props;
    initialize(this.props.navigation.getParam("entity"));
    navigation.setParams({ handleSave: handleSubmit(this.save) });
  }

  render() {
    const types = this.props.navigation.getParam("types");
    return <Form types={types} />;
  }

  /**
   * Сохранить сущность
   */
  save = values => {
    console.log(values);
  };
}

const Details = reduxForm({ form: "Details" })(DetailsContainer);

export { Details };
