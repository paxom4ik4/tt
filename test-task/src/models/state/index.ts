import rootReducer from "store/combineReducers";

export type State = ReturnType<typeof rootReducer>;
