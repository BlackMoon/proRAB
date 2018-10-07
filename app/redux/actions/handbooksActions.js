import {
  LOAD_HANDBOOKS_FAILED,
  LOAD_HANDBOOKS_REQUEST,
  LOAD_HANDBOOKS_SUCCESS
} from "@constants";

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
