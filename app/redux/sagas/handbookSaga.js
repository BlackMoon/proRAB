import {
  LOAD_HANDBOOKS_FAILED,
  LOAD_HANDBOOKS_REQUEST,
  LOAD_HANDBOOKS_SUCCESS,
  LOAD_HANDBOOK_FAILED,
  LOAD_HANDBOOK_REQUEST,
  LOAD_HANDBOOK_SUCCESS
} from "@constants";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { HandbooksDataService } from "@services";

const ds = new HandbooksDataService();

export function* loadHandbookAsync({ id }) {
  try {
    const item = yield call([ds, "get"], id);
    yield put({ type: LOAD_HANDBOOK_SUCCESS, handbook: item });
  } catch (e) {
    yield put({ type: LOAD_HANDBOOK_FAILED, e });
  }
}

export function* loadHandbooksAsync() {
  try {
    const items = yield call([ds, "getAll"]);
    yield put({ type: LOAD_HANDBOOKS_SUCCESS, handbooks: items });
  } catch (e) {
    yield put({ type: LOAD_HANDBOOKS_FAILED, e });
  }
}

export function* watchHandbookAsync() {
  yield all([
    takeEvery(LOAD_HANDBOOK_REQUEST, loadHandbookAsync),
    takeEvery(LOAD_HANDBOOKS_REQUEST, loadHandbooksAsync)
  ]);
}
