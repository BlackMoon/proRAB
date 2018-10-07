import { combineReducers } from "redux";
import handbooks from "./handbooksReducer";
import records from "./recordsReducer";

const rootReducer = combineReducers({
  records,
  handbooks
});

export default rootReducer;
