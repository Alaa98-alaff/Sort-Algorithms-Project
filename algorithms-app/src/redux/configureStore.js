import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import Saga from "./saga/Saga";
import createSagaMiddleware from "redux-saga";
import bubbleSortReducer from "./reducers/bubbleSort";

const combinedReducer = combineReducers({
  bubbleSortReducer: bubbleSortReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(Saga);

export default store;
