import * as RepairsActions from "@redux/actions";

import { Construction } from "@components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(RepairsActions, dispatch)
});
const mapStateToProps = state => ({
  state: state.counter
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Construction);
