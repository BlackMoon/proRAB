import {
  ADD_RECORD_FAILED,
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS,
  LOAD_RECORDS_FAILED,
  LOAD_RECORDS_REQUEST,
  LOAD_RECORDS_SUCCESS,
  UPDATE_RECORD_FAILED,
  UPDATE_RECORD_REQUEST,
  UPDATE_RECORD_SUCCESS
} from "@constants";
import { HandbooksDataService, RecordsDataService } from "@services";
import { all, call, put, takeEvery } from "redux-saga/effects";

const handbooksDs = new HandbooksDataService();
const recordsDs = new RecordsDataService();

export function* addRecordAsync({ item, table }) {
  try {
    const id = yield call([recordsDs, "add"], item, table);
    yield put({ type: ADD_RECORD_SUCCESS, id });
  } catch (e) {
    yield put({ type: ADD_RECORD_FAILED, e });
  }
}

export function* loadRecordsAsync({ id }) {
  try {
    const handbook = yield call([handbooksDs, "get"], id);
    const records = yield call([recordsDs, "getAll"], handbook.table);
    yield put({
      type: LOAD_RECORDS_SUCCESS,
      fields: handbook.fields,
      records: records,
      table: handbook.table
    });
  } catch (e) {
    yield put({ type: LOAD_RECORDS_FAILED, e });
  }
}

export function* updateRecordAsync({ item, table }) {
  try {
    let a = yield call([recordsDs, "update"], item, table);
    console.log(a);
    yield put({ type: UPDATE_RECORD_SUCCESS });
  } catch (e) {
    yield put({ type: UPDATE_RECORD_FAILED, e });
  }
}

export function* watchRecordsAsync() {
  yield all([
    takeEvery(ADD_RECORD_REQUEST, addRecordAsync),
    takeEvery(LOAD_RECORDS_REQUEST, loadRecordsAsync),
    takeEvery(UPDATE_RECORD_REQUEST, updateRecordAsync)
  ]);
}
