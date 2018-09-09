import { loadHandbooksRequest, loadHandbooksSuccess } from "@redux/actions";

import { HandbookList } from "@components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { loadHandbooksRequest, loadHandbooksSuccess },
    dispatch
  )
});
const mapStateToProps = state => ({
  handbooks: state.handbook.items,
  loading: state.handbook.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandbookList);
