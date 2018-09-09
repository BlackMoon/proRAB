import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers";

export * from "./actions";

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
