import {
  ADD_RECORD_FAILED,
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS,
  LOAD_RECORDS_FAILED,
  LOAD_RECORDS_REQUEST,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORD_REQUEST,
  TOGGLE_RECORDS_EDIT_MODE,
  UPDATE_RECORD_FAILED,
  UPDATE_RECORD_REQUEST,
  UPDATE_RECORD_SUCCESS
} from "@constants";

const initialState = {
  editMode: false,
  goBack: false,
  fields: [],
  items: [],
  table: null,
  loading: false
};

export default function recordsReducer(state = initialState, action) {
  switch (action.type) {
    /*failed*/
    case ADD_RECORD_FAILED:
    case UPDATE_RECORD_FAILED:
      return { ...state, loading: false };
    case LOAD_RECORDS_FAILED:
      return { ...state, fields: [], items: [], table: null, loading: false };
    /*request*/
    case ADD_RECORD_REQUEST:
    case LOAD_RECORD_REQUEST:
      return {
        ...state,
        goBack: false,
        item: action.item,
        fields: action.fields,
        table: action.table
      };
    case LOAD_RECORDS_REQUEST:
    case UPDATE_RECORD_REQUEST:
      return {
        ...state,
        goBack: false,
        item: action.item,
        table: action.table,
        loading: true
      };
    /*success*/
    case ADD_RECORD_SUCCESS:
      return { ...state, goBack: true, loading: false };
    case LOAD_RECORDS_SUCCESS:
      return {
        ...state,
        fields: action.fields,
        items: action.records,
        table: action.table,
        loading: false
      };
    case UPDATE_RECORD_SUCCESS:
      return { ...state, goBack: true, item: null, loading: false };
    case TOGGLE_RECORDS_EDIT_MODE:
      return { ...state, editMode: !state.editMode };
    default:
      return state;
  }
}
