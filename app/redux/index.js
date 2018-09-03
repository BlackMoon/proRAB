import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export * from "./actions";

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
