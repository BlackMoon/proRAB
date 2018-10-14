import {
  HANDBOOK_EDIT_MODE,
  LOAD_HANDBOOKS_FAILED,
  LOAD_HANDBOOKS_REQUEST,
  LOAD_HANDBOOKS_SUCCESS
} from "@constants";

const initialState = {
  editMode: false,
  items: [],
  loading: false
};

export default function handbooksReducer(state = initialState, action) {
  switch (action.type) {
    case HANDBOOK_EDIT_MODE:
      return { ...state, editMode: !state.editMode };
    case LOAD_HANDBOOKS_FAILED:
      return { ...state, loading: false };
    case LOAD_HANDBOOKS_REQUEST:
      return { ...state, loading: true };
    case LOAD_HANDBOOKS_SUCCESS:
      return { ...state, items: action.handbooks, loading: false };

    default:
      return state;
  }
}
