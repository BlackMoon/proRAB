import { LOAD_HANDBOOKS_REQUEST, LOAD_HANDBOOKS_SUCCESS } from "@constants";
import { call, put, takeEvery } from "redux-saga/effects";

import { HandbooksDataService } from "@services";

const ds = new HandbooksDataService();

export function* loadHandbooksAsync() {
  try {
    const items = yield call([ds, "getAll"]);
    yield put({ type: LOAD_HANDBOOKS_SUCCESS, handbooks: items });
  } catch (ex) {}
}

export function* watchLoadHandbooksAsync() {
  yield takeEvery(LOAD_HANDBOOKS_REQUEST, loadHandbooksAsync);
}
