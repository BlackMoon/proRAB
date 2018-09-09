export const ICON_SIZE = 25;

// actions
export const ADD_REPAIR = "ADD_REPAIR";
export const LOAD_HANDBOOKS_REQUEST = "LOAD_HANDBOOKS_REQUEST";
export const LOAD_HANDBOOKS_SUCCESS = "LOAD_HANDBOOKS_SUCCESS";

const config = {
  DB_NAME: "projects.db",
  DB_MODULE: require("@data/projects.db")
};

export default config;
