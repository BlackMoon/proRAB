import {
  LOAD_HANDBOOKS_FAILED,
  LOAD_HANDBOOKS_REQUEST,
  LOAD_HANDBOOKS_SUCCESS,
  LOAD_HANDBOOK_FAILED,
  LOAD_HANDBOOK_REQUEST,
  LOAD_HANDBOOK_SUCCESS
} from "@constants";

const initialState = {
  activeItem: { records: [] },
  items: [],
  loading: false
};

export default function handbookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HANDBOOK_FAILED:
    case LOAD_HANDBOOKS_FAILED:
      return { ...state, loading: false };
    case LOAD_HANDBOOK_REQUEST:
    case LOAD_HANDBOOKS_REQUEST:
      return { ...state, loading: true };
    case LOAD_HANDBOOK_SUCCESS:
      return { ...state, activeItem: action.handbook, loading: false };
    case LOAD_HANDBOOKS_SUCCESS:
      return { ...state, items: action.handbooks, loading: false };

    default:
      return state;
  }
}
