import { all } from "redux-saga/effects";
import { watchLoadHandbooksAsync } from "./handbookSaga";

export default function* rootSaga() {
  yield all([watchLoadHandbooksAsync()]);
}
