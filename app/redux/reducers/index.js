import { combineReducers } from "redux";
import handbook from "./handbookReducer";
import repairsReducer from "./repairsReducer";

const rootReducer = combineReducers({
  handbook,
  repairsReducer
});

export default rootReducer;
