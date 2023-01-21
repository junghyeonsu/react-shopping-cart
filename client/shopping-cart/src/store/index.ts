import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { exampleReducer } from "./slices/example";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  example: exampleReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: import.meta.env.MODE === "development",
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { store };
export type { AppDispatch, RootState };
