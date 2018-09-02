import * as types from "./../ActionTypes";

export function addRepair(name) {
  return {
    type: types.ADD_REPAIR,
    name
  };
}
