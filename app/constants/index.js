export const ICON_SIZE = 25;

const config = {
  DB_NAME: "projects.db",
  DB_MODULE: require("@data/projects.db")
};

export default config;

/**
 * Handbooks
 */

//Load handbooks
export const LOAD_HANDBOOKS_FAILED = "LOAD_HANDBOOKS_FAILED";
export const LOAD_HANDBOOKS_REQUEST = "LOAD_HANDBOOKS_REQUEST";
export const LOAD_HANDBOOKS_SUCCESS = "LOAD_HANDBOOKS_SUCCESS";

/**
 * Records
 */

//Add record
export const ADD_RECORD_FAILED = "ADD_RECORD_FAILED";
export const ADD_RECORD_REQUEST = "ADD_RECORD_REQUEST";
export const ADD_RECORD_SUCCESS = "ADD_RECORD_SUCCESS";

//Load single record
export const LOAD_RECORD_REQUEST = "LOAD_RECORD_REQUEST";

//Load records
export const LOAD_RECORDS_FAILED = "LOAD_RECORDS_FAILED";
export const LOAD_RECORDS_REQUEST = "LOAD_RECORDS_REQUEST";
export const LOAD_RECORDS_SUCCESS = "LOAD_RECORDS_SUCCESS";

//Update record
export const UPDATE_RECORD_FAILED = "UPDATE_RECORD_FAILED";
export const UPDATE_RECORD_REQUEST = "UPDATE_RECORD_REQUEST";
export const UPDATE_RECORD_SUCCESS = "UPDATE_RECORD_SUCCESS";
