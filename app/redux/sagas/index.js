import { all } from "redux-saga/effects";
import { watchHandbooksAsync } from "./handbooksSaga";
import { watchRecordsAsync } from "./recordsSaga";

export default function* rootSaga() {
  yield all([watchHandbooksAsync(), watchRecordsAsync()]);
}
