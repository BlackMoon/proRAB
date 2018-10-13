import React, { Component } from "react";
import {
  addRecordRequest,
  loadRecordRequest,
  updateRecordRequest
} from "@redux/actions";

import { Button } from "react-native";
import { Form } from "@components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class DetailsContainer extends Component {
  state = {};

  static getDerivedStateFromProps(props) {
    const { goBack, navigation } = props;
    if (goBack) {
      navigation.goBack();
    }
    return null;
  }

  static navigationOptions = ({ navigation }) => {
    const handleSave = navigation.getParam("handleSave");
    return {
      headerRight: <Button onPress={() => handleSave()} title="Сохранить" />
    };
  };

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
    const { actions, table } = this.props;
    const record = this._form.handleSubmit();
    actions[record.id ? "updateRecordRequest" : "addRecordRequest"](
      record,
      table
    );
  };

  render() {
    return <Form ref={c => (this._form = c)} {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { addRecordRequest, loadRecordRequest, updateRecordRequest },
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
