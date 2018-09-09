import { LOAD_HANDBOOKS_REQUEST, LOAD_HANDBOOKS_SUCCESS } from "@constants";

export const loadHandbooksRequest = () => ({
  type: LOAD_HANDBOOKS_REQUEST
});

export const loadHandbooksSuccess = handbooks => ({
  type: LOAD_HANDBOOKS_SUCCESS,
  handbooks
});
