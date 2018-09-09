import { ADD_REPAIR } from "@constants";

export function addRepair(name) {
  return {
    type: ADD_REPAIR,
    name
  };
}
