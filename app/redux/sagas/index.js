import { all } from "redux-saga/effects";
import { watchHandbookAsync } from "./handbookSaga";

export default function* rootSaga() {
  yield all([watchHandbookAsync()]);
}
