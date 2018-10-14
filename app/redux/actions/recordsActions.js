import {
  ADD_RECORD_FAILED,
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS,
  LOAD_RECORDS_FAILED,
  LOAD_RECORDS_REQUEST,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORD_REQUEST,
  TOGGLE_RECORDS_EDIT_MODE,
  UPDATE_RECORD_REQUEST
} from "@constants";

export const addRecordFailed = ex => ({
  type: ADD_RECORD_FAILED,
  ex
});

export const addRecordRequest = (item, table) => ({
  type: ADD_RECORD_REQUEST,
  item,
  table
});

export const addRecordSuccess = id => ({
  type: ADD_RECORD_SUCCESS,
  id
});

export const loadRecordRequest = (item, fields, table) => ({
  type: LOAD_RECORD_REQUEST,
  item,
  fields,
  table
});

export const loadRecordsFailed = ex => ({
  type: LOAD_RECORDS_FAILED,
  ex
});

export const loadRecordsRequest = id => ({
  type: LOAD_RECORDS_REQUEST,
  id
});

export const loadRecordsSuccess = (records, fields) => ({
  type: LOAD_RECORDS_SUCCESS,
  records,
  fields
});

export const toggleRecordsEditMode = () => ({
  type: TOGGLE_RECORDS_EDIT_MODE
});

export const updateRecordRequest = (item, table) => ({
  type: UPDATE_RECORD_REQUEST,
  item,
  table
});
