import {
  LOAD_HANDBOOKS_FAILED,
  LOAD_HANDBOOKS_REQUEST,
  LOAD_HANDBOOKS_SUCCESS
} from "@constants";
import { call, put, takeEvery } from "redux-saga/effects";

import { HandbooksDataService } from "@services";

const handbooksDs = new HandbooksDataService();

export function* loadHandbooksAsync() {
  try {
    const items = yield call([handbooksDs, "getAll"]);
    yield put({ type: LOAD_HANDBOOKS_SUCCESS, handbooks: items });
  } catch (e) {
    yield put({ type: LOAD_HANDBOOKS_FAILED, e });
  }
}

export function* watchHandbooksAsync() {
  yield takeEvery(LOAD_HANDBOOKS_REQUEST, loadHandbooksAsync);
}
