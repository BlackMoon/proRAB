import { LOAD_HANDBOOKS_REQUEST, LOAD_HANDBOOKS_SUCCESS } from "@constants";

const initialState = {
  items: [],
  loading: false
};

export default function handbookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HANDBOOKS_REQUEST:
      return { ...state, loading: true };
    case LOAD_HANDBOOKS_SUCCESS:
      return { ...state, items: action.handbooks, loading: false };

    default:
      return state;
  }
}
