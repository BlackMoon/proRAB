import {
  LOAD_HANDBOOKS_FAILED,
  LOAD_HANDBOOKS_REQUEST,
  LOAD_HANDBOOKS_SUCCESS,
  LOAD_HANDBOOK_FAILED,
  LOAD_HANDBOOK_REQUEST,
  LOAD_HANDBOOK_SUCCESS
} from "@constants";

export const loadHandbookFailed = ex => ({
  type: LOAD_HANDBOOK_FAILED,
  ex
});

export const loadHandbookRequest = id => ({
  type: LOAD_HANDBOOK_REQUEST,
  id
});

export const loadHandbookSuccess = handbook => ({
  type: LOAD_HANDBOOK_SUCCESS,
  handbook
});

export const loadHandbooksFailed = ex => ({
  type: LOAD_HANDBOOKS_FAILED,
  ex
});

export const loadHandbooksRequest = () => ({
  type: LOAD_HANDBOOKS_REQUEST
});

export const loadHandbooksSuccess = handbooks => ({
  type: LOAD_HANDBOOKS_SUCCESS,
  handbooks
});
